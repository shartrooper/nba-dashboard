import { ReactNode } from 'react';
import Hero from '@/assets/hero.png'

export const Landing = ({ children }: { children: ReactNode }) => {
  return (
    <div className='sm:border-solid sm:border sm:rounded sm:border-chalkboard w-full sm:h-full'>
      <div className='flex flex-col sm:flex-row' >
        <div className='w-full sm:w-1/2 md:w-3/5 flex flex-col items-center justify-center xs:pt-8 sm:pt-14 md:pt-20 lg:pt-40'>
          <img alt='hero nba logo..' className='w-1/3 h-28 sm:h-72 md:h-96' src={Hero} />
          <p className='text-2xl sm:text-4xl md:text-6xl'>Dashboard</p>
        </div>
        <div className='w-full pt-6 px-8 mb-4 sm:pt-24 sm:w-1/2 md:pt-36 md:w-2/5 lg:pt-52'>
          {children}
        </div>
      </div>
    </div>
  );
};
