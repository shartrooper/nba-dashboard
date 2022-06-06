import { ReactNode } from 'react';

export const Landing = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-white h-[100vh] flex items center ">
      <h1>Welcome to NBA dashboard!</h1>
      {children}
    </div>
  );
};
