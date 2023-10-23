import React from "react";

export interface INavigateIconButtonProps {
  title: string;
  icon: React.ReactNode;
  navigateFn: React.MouseEventHandler;
  id?: string | number;
}

export interface IReturnButtonProps {
  xs?: number;
}

export interface IActionIdProps {
  id?: string | number;
}
