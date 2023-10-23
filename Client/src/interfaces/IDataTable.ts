import React from "react";

export interface IDataTableHeader {
  label: string;
  field: string;
  type: string;
}

export interface IDataTableCell {
  label: string;
  value: any;
  type: string;
}

export interface IDataTable {
  data: any[];
  title: string;
  headers: IDataTableHeader[];
  refreshFn: React.MouseEventHandler;
  createFn?: React.MouseEventHandler;
  editFn?: React.MouseEventHandler;
  deleteFn?: React.MouseEventHandler;
  filters?: React.ReactNode;
  actions?: React.ReactNode;
  loading: boolean;
  allowCreate?: boolean;
  allowEdit?: boolean;
  allowDelete?: boolean;
  allowReturn?: boolean;
}

export interface IFiltersProps {
  filters: React.ReactNode;
  allowCreate: boolean;
  allowReturn: boolean;
  refreshFn: React.MouseEventHandler;
  createFn?: React.MouseEventHandler;
}

export interface IActionProps {
  item: any;
  actions: React.ReactNode;
}

export interface ITableButtonProps {
  item: any;
  fn?: React.MouseEventHandler;
}
