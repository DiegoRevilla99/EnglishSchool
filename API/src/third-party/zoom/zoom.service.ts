import KJUR = require('jsrsasign');
import dayjs = require('dayjs');
import utc = require('dayjs/plugin/utc');
import timezone = require('dayjs/plugin/timezone');

import { catchError, lastValueFrom, map } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import {
  _zoomAccessToken,
  _zoomAccountId,
  _zoomApiUrl,
  _zoomClientId,
  _zoomClientSecret,
  _zoomKey,
  _zoomSecret,
  randomPassword,
} from 'src/utils/constants';

import { ZoomRequest, ZoomResponse } from './entities/zoom.entity';
import { Session } from 'src/app/sessions/entities/session.entity';
import { Teacher } from 'src/app/teachers/entities/teacher.entity';
import { Student } from 'src/app/students/entities/student.entity';

dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class ZoomService {
  private readonly logger = new Logger('Zoom');
  constructor(private readonly httpService: HttpService) {}

  async getSignature(
    request: ZoomRequest,
  ): Promise<AxiosResponse<ZoomResponse>> {
    const iat = Math.round(new Date().getTime() / 1000) - 30;
    const exp = iat + 60 * 60 * 2;
    const oHeader = { alg: 'HS256', typ: 'JWT' };

    const oPayload = {
      iat: iat,
      exp: exp,
      tokenExp: exp,
      sdkKey: _zoomKey,
      appKey: _zoomKey,

      tpc: request.topic,
      pwd: request.password,
      role: request.role,
      mn: request.meet,
    };

    const sHeader = JSON.stringify(oHeader);
    const sPayload = JSON.stringify(oPayload);
    const signature = KJUR.jws.JWS.sign(
      'HS256',
      sHeader,
      sPayload,
      _zoomSecret,
    );

    return signature;
  }

  async getAccessToken() {
    const zoomAccessToken = await lastValueFrom(
      this.httpService
        .post(
          'https://zoom.us/oauth/token',
          { grant_type: 'account_credentials', account_id: _zoomAccountId },
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: `Basic ${Buffer.from(
                `${_zoomClientId}:${_zoomClientSecret}`,
              ).toString('base64')}`,
            },
          },
        )
        .pipe(
          map((response) => {
            return response.data;
          }),
          catchError((error: AxiosError) => {
            this.logger.warn(`Error ${JSON.stringify(error.response.data)}`);
            throw new InternalServerErrorException(
              'No se pudo crear la reunión',
            );
          }),
        ),
    );
    return zoomAccessToken;
  }

  async createMeeting(session: Session, teacher: Teacher, student: Student) {
    const meetPwd = randomPassword(9);
    const meetingHour = dayjs(session.sessionDate).tz('America/Mexico_City');
    const name = `${student.user.firstName} ${student.user.lastName}`;
    const classTopic = `${
      session.isFirst
        ? 'Primera sesión'
        : `Clase ${meetingHour.toDate().toLocaleString()}`
    } - ${name}`;
    const { access_token } = await this.getAccessToken();

    const zoomMeeting = await lastValueFrom(
      this.httpService
        .post(
          `${_zoomApiUrl}/me/meetings`,
          {
            agenda: classTopic,
            default_password: false,
            duration: session.duration,
            password: meetPwd,
            pre_schedule: false,
            authentication_exception: [
              {
                email: teacher.user.email,
                name: teacher.user.firstName,
              },
            ],
            meeting_invitees: [
              {
                email: student.user.email,
              },
            ],
            settings: {
              approval_type: 2,
              additional_data_center_regions: ['TY'],
              allow_multiple_devices: true,
              approved_or_denied_countries_or_regions: {
                approved_list: ['MX'],
                denied_list: [],
                enable: true,
                method: 'approve',
              },
              auto_recording: 'local',
              contact_email: teacher.user.email,
              email_notification: true,
              encryption_type: 'enhanced_encryption',
              host_video: true,
              jbh_time: 10,
              join_before_host: true,
              mute_upon_entry: true,
              meeting_authentication: false,
              participant_video: true,
              registrants_confirmation_email: true,
              registrants_email_notification: true,
              registration_type: 1,
              show_share_button: true,
              use_pmi: false,
              waiting_room: false,
              watermark: false,
              host_save_video_order: true,
              alternative_host_update_polls: true,
            },
            start_time: meetingHour.format('YYYY-MM-DDTHH:mm:ss'),
            timezone: 'America/Mexico_City',
            topic: classTopic,
            type: 2,
          },
          {
            headers: {
              Authorization: 'Bearer ' + access_token,
            },
          },
        )
        .pipe(
          map((response) => {
            return response.data;
          }),
          catchError((error: AxiosError) => {
            this.logger.warn(`Error ${JSON.stringify(error.response.data)}`);
            throw new InternalServerErrorException(
              'No se pudo crear la reunión',
            );
          }),
        ),
    );

    return { zoomMeeting, meetPwd };
  }
}
