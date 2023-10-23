import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Breadcrumb = ({ children }: Props) => {
  return (
    <div className="breadcrumb-container">
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">{children}</ol>
        </nav>
      </div>
    </div>
  );
};
