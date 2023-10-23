import { ToastOptions, toast } from "react-toastify";

import { IPayloadError } from "@/interfaces/IPayloadError";

import Auth from "@/models/Auth";
import Session from "@/models/Session";

export const days = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

export const MILI_IN_HOUR = 60 * 60 * 1000;
export const MILI_IN_DAY = 1000 * 3600 * 24;
export const PHONE_REG_EXP =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

export const baseURL = import.meta.env.VITE_API;
export const clientURL = import.meta.env.VITE_URL;

export const paypalKey = import.meta.env.VITE_PAYPAL_KEY;
export const paypalSecret = import.meta.env.VITE_PAYPAL_SECRET;

export const zoomClientId = import.meta.env.VITE_ZOOM_SDK_CLIENT_ID;
export const zoomClientSecret = import.meta.env.VITE_ZOOM_SDK_CLIENT_SECRET;

export const zoomSDK = import.meta.env.VITE_ZOOM_SDK_KEY;
export const zoomSDKSecret = import.meta.env.VITE_ZOOM_SDK_SECRET;

export const configuration: ToastOptions<{}> = {
  position: toast.POSITION.BOTTOM_RIGHT,
  autoClose: 1350,
  theme: "colored",
};

export const loadingToast = (message: string | undefined) => {
  toast.loading(message);
};

export const successToast = (message: string | undefined) => {
  toast.success(message, configuration);
};

export const errorToast = (error: IPayloadError) => {
  const finalMessage =
    error.message === "Unauthorized" ? "Inicia sesión" : error.message;
  toast.error(finalMessage || "Error", configuration);
};

export const successOrFailToast = (
  successMessage: string,
  failedMessage: string,
  result: boolean
) => {
  result
    ? toast.success(successMessage, configuration)
    : toast.error(failedMessage, configuration);
};

export const capitalizeString = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getSessionName = (session: Session | undefined) => {
  if (!session) return `Clase ${new Date().toLocaleDateString()}`;

  const title = new Date(session.sessionDate).toLocaleDateString();
  return `Clase ${title}`;
};

export const getFullName = (user: Auth | null) => {
  return user ? `${user.firstName} ${user.lastName}` : "";
};

export const getEmailForZoom = (
  user: Auth | null,
  session: Session | undefined
) => {
  if (!user || !session) return "logralahad@gmail.com";

  return user.role === "PROFESOR" ? user.email : session.teacher.email;
};

export const truncateString = (source: string, size: number) => {
  if (!source) return "N/D";
  return source.length > size ? source.slice(0, size - 1) + "…" : source;
};
