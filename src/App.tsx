import './index.css';

import { useState } from 'react';

import Home from '@/components/Home';
import { Index } from '@/constants';
import {useGetUserInfo, useUserContext} from '@/hooks';

import Signin from './components/Signin';
import Signup from './components/Signup';
import Loader from './components/Loader';

const App = () => {
  const [showSignup, setShowSignup] = useState(true);
  const { userData } = useUserContext();
    const { isLoading } = useGetUserInfo();


    if (isLoading) {
        return <Loader />;
    }

    return userData ? (
    <Home name={userData.name} />
  ) : (
    <div className="flex flex-col items-center justify-center h-screen">
      {showSignup ? <Signup /> : <Signin />}
      <a onClick={() => setShowSignup((prev) => !prev)} className="cursor-pointer mt-4 text-gray-500 underline">
        {showSignup ? Index.LINKS.ALREADY_HAVE_ACCOUNT : Index.LINKS.NEED_ACCOUNT}
      </a>
    </div>
  );
};

export default App;
