import React from "react";

import { Breakpoint } from "@mui/material";

export interface IModalProps {
  open: boolean;
  title: string;
  closeFn: React.MouseEventHandler;
  maxWidth?: false | Breakpoint;
  children?: React.ReactNode;
}
