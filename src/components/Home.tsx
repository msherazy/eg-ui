import React, { useContext } from 'react';

import { Button } from '@/components/ui/button.tsx';
import { Index } from '@/constants';
import { UserContext } from '@/context/user-context.ts';
import { type HomeProps } from '@/types';

const Home: React.FC<HomeProps> = ({ name }) => {
  const { updateUserData } = useContext(UserContext);
  return (
    <div className="flex flex-col gap-2 items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold">
        {Index.WELCOME_MESSAGE}
        {name}!
      </h1>
      <Button
        onClick={() => {
          localStorage.removeItem('token');
          updateUserData(null);
        }}
      >
        {Index.BUTTONS.SIGN_OUT}
      </Button>
    </div>
  );
};

export default Home;
