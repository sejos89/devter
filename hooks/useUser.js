import { onAuthStateChangedFunc } from 'firebase/client';
import router from 'next/router';
import { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';

export const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOWN: undefined,
};

export default function useUser() {
  const [user, setUser] = useState(USER_STATES.NOT_KNOWN);

  useEffect(() => {
    onAuthStateChangedFunc(setUser);
  }, []);

  useEffect(() => {
    user === USER_STATES.NOT_LOGGED && router.push('/');
  }, [user]);

  return user;
}
