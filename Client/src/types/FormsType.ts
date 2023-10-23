import IFormikProps from "@/interfaces/IFormikProps";

interface WithPassword {
  isCreating?: boolean;
}

export type FormikForCrud = IFormikProps & WithPassword;
