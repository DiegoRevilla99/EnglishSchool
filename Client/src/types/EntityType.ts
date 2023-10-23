import { ILesson } from "@/interfaces/Formik/ILesson";
import { ILevel } from "@/interfaces/Formik/ILevel";
import { IPlan } from "@/interfaces/Formik/IPlan";
import { IRole } from "@/interfaces/Formik/IRole";
import { ISession } from "@/interfaces/Formik/ISession";
import { IStudent } from "@/interfaces/Formik/IStudent";
import { ISubscription } from "@/interfaces/Formik/ISubscription";
import { ITeacher } from "@/interfaces/Formik/ITeacher";
import { IUnit } from "@/interfaces/Formik/IUnit";
import { IUser } from "@/interfaces/Formik/IUser";

export type EntityApi =
  | ILesson
  | ILevel
  | IPlan
  | IRole
  | ISession
  | IStudent
  | ISubscription
  | ITeacher
  | IUnit
  | IUser;
