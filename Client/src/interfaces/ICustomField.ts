import { ReactNode } from "react";
import { FormikProps } from "formik/dist/types";

export interface INormalProps {
  sm?: number;
  type?: string;
  label: string;
  field: string;
  hidden?: boolean;
  required?: boolean;
  withIcon?: boolean;
  autoFocus?: boolean;
  icon?: ReactNode;
  formik: FormikProps<any>;
  iconPosition?: "start" | "end";
}

export interface IImageProps {
  sm?: number;
  type?: string;
  label: string;
  field: string;
  hidden?: boolean;
  multiple?: boolean;
  required?: boolean;
  withIcon?: boolean;
  autoFocus?: boolean;
  icon?: ReactNode;
  formik: FormikProps<any>;
  iconPosition?: "start" | "end";
}

export interface IPasswordProps {
  sm?: number;
  hidden?: boolean;
  required?: boolean;
  withIcon?: boolean;
  autoFocus?: boolean;
  formik: FormikProps<any>;
  iconPosition?: "start" | "end";
  label: "Contraseña" | "Nueva contraseña";
}

export interface IDateProps {
  sm?: number;
  label: string;
  field: string;
  hidden?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  formik: FormikProps<any>;
  disablePast?: boolean;
  disableFuture?: boolean;
}

export interface IMultiSelect {
  sm?: number;
  label: string;
  field: string;
  formik: FormikProps<any>;
}
