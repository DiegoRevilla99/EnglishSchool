import { useBeforeunload } from "react-beforeunload";
import { useAppSelector } from "@/hooks/useRedux";

import ZoomMtgEmbedded from "@zoomus/websdk/embedded";

import { useGetSignatureMutation } from "@/slices/ZoomSlice";
import { errorToast, getEmailForZoom, getFullName, zoomSDK } from "@/utils";

import { Box } from "@mui/material";
import { VideoChatOutlined } from "@mui/icons-material";

import Session from "@/models/Session";

import ZoomBg from "@/assets/images/zoomHolder.png";

export default function ZoomFrame({
  session,
}: {
  session: Session | undefined;
}) {
  const sizes = { width: 1080, height: 480 };
  const client = ZoomMtgEmbedded.createClient();

  const currentUser = useAppSelector((state) => state.auth.user);

  const [getSignature] = useGetSignatureMutation();

  useBeforeunload(() => {
    client
      .leaveMeeting()
      .then(() => {
        console.log("Abandonaste la reunion");
      })
      .catch(() => {
        console.log("Abandonaste la reunion");
      });
  });

  const initiateMeeting = () => {
    let meetingSDKElement =
      document.getElementById("meetingSDKElement") || undefined;

    client.init({
      debug: true,
      language: "en-US",
      zoomAppRoot: meetingSDKElement,
      customize: {
        meetingInfo: [
          "topic",
          "host",
          "mn",
          "pwd",
          "telPwd",
          "invite",
          "participant",
          "dc",
          "enctype",
        ],
        video: {
          defaultViewType: "ribbon",
          isResizable: true,
          viewSizes: {
            default: { width: sizes.width, height: sizes.height },
            ribbon: {
              width: sizes.width,
              height: sizes.height,
            },
          },
        },
      },
    });
  };

  const joinMeeting = ({
    sig,
    meet,
    pwd,
  }: {
    sig: string;
    meet: string;
    pwd: string;
  }) => {
    client
      .join({
        sdkKey: zoomSDK,
        password: pwd,
        signature: sig,
        meetingNumber: meet,
        userName: getFullName(currentUser),
        userEmail: getEmailForZoom(currentUser, session),
      })
      .then(() => {
        console.log("Te has unido");
      })
      .catch((error) => {
        console.log(error);
        errorToast({
          statusCode: 500,
          error: "Zoom Error",
          message: "No se te pudo unir a la sesión",
        });
      });
  };

  const tryJoin = async () => {
    if (session) {
      const meet = session.zoomMeetingId.replace(" ", "").trim();

      const { signature } = await getSignature({
        meet,
        role: "0",
        topic: "Clase",
        password: session.zoomMeetingPwd,
      }).unwrap();

      if (signature) {
        initiateMeeting();

        joinMeeting({
          meet: meet,
          sig: signature,
          pwd: session.zoomMeetingPwd,
        });
      }
    }
  };

  return (
    <Box
      gap={2}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
      position="relative"
    >
      <Box
        height="100%"
        width="100%"
        sx={{
          position: "absolute",
          backgroundPosition: "center",
          backgroundImage: `url(${ZoomBg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          id="meetingSDKElement"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          {/* Zoom Meeting SDK Component View Rendered Here */}
        </div>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: 0,
          transition: "opacity 0.3s ease-in-out",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          "&:hover": {
            opacity: 1,
            cursor: "pointer",
          },
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          onClick={() => {
            if (session === undefined) {
              return;
            }

            tryJoin();
          }}
        >
          <VideoChatOutlined
            sx={{
              fontSize: "90px",
            }}
            htmlColor={session !== undefined ? "#4fdd78" : "#b20100"}
          />
        </Box>
      </Box>
    </Box>
  );
}
