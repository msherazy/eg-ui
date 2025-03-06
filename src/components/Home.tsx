import React from 'react';

import {Index} from '@/constants';
import {type HomeProps} from '@/types';

const Home: React.FC<HomeProps> = ({ name }) => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center h-screen bg-red-300">
      <h1 className="text-4xl font-bold">
        {Index.WELCOME_MESSAGE}
        {name}!
      </h1>
    </div>
  );
};

export default Home;
