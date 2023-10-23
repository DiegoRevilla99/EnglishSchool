import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  isActive?: boolean;
};

export const BreadcrumbItem = ({ children, isActive = false }: Props) => {
  return <li className={`breadcrumb-item ${isActive ? 'active' : ''}`}>{children}</li>;
};
