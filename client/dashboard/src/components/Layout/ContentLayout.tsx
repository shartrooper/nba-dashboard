import React, { ReactNode } from 'react';

type ContentLayoutProps = {
  children: ReactNode;
};

export const ContentLayout = ({ children }: ContentLayoutProps) => {
  return (
    <div className="text-chalkboard sm:h-screen">
      {children}
    </div>
  );
};
