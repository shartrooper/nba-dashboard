import React, { ReactNode } from 'react';

type ContentLayoutProps = {
  children: ReactNode;
};

export const ContentLayout = ({ children }: ContentLayoutProps) => {
  return (
    <div className="bg-midnight text-chalkboard sm:h-screen">
      <div className="mx-auto px-4 sm:px-6 md:px-8 sm:h-full overflow-auto">{children}</div>
    </div>
  );
};
