'use client';

import {
  useReducer,
  useCallback,
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { useRouter, usePathname } from 'next/navigation';
import type {
  AuthChangeEvent,
  User,
} from '@supabase/supabase-js';
import { ProfileInput } from '@/features/auth/schema';
import { getCurrentProfile } from './server';
import supabase from '@/lib/supabase/client';
import { toast } from 'sonner';


type State = {
  loading: boolean;
  authenticated: boolean;
  user: User;
  profile: ProfileInput;
  error: string;
  view: React.ReactNode;
};

type Actions = {
  setError: (x: string) => void;
  setProfile: (x: ProfileInput) => void;
  setView: (x: React.ReactNode) => void;
  actionSignOut: () => void;
};

export const AuthContext = createContext<[State, Actions]>([null, null]);
AuthContext.displayName = 'AuthContext';

function reducer(
  state: State,
  { type, payload }: { type: string; payload: any }
) {
  return {
    ...state,
    [type]: payload,
  };
}

export const AuthProvider = ({ children } : {children: ReactNode}) => {
  const router = useRouter();
  const pathName = usePathname();

  const [state, dispatch] = useReducer(reducer, {
    loading: true,
    authenticated: false,
    user: null,
    profile: null,
    error: '',
    view: '',
  });

  const setUser = (value: User) => {
    dispatch({ type: 'user', payload: value });
    dispatch({ type: 'authenticated', payload: Boolean(value?.id) });
  };
  const setProfile = (value: ProfileInput) =>
    dispatch({ type: 'profile', payload: value });
  const setError = (value: string) =>
    dispatch({ type: 'error', payload: value });
  const setView = (value: React.ReactNode) =>
    dispatch({ type: 'view', payload: value });

  const actionSignOut = useCallback(async () => {
    const redirectUrl = new URL('localhost:3000/');
    redirectUrl.pathname = '/';
    redirectUrl.searchParams.set(`redirectTo`, pathName);
    await supabase.auth.signOut();
    router.replace(redirectUrl.toString());
    setUser(null);
    setProfile(null);
    toast.success('You have been signed out');
  }, [pathName, router]);

  useEffect(() => {
    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, currentSession) => {
        if (currentSession) {
          setUser(currentSession.user);
          const profile = await getCurrentProfile();
          setProfile(profile);
        } else {
          setUser(null);
          setProfile(null);
        }
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const value = useMemo((): [State, Actions] => {
    return [
      { ...state } as State,
      {
        setError,
        setView,
        setProfile,
        actionSignOut,
      },
    ];
  }, [state]); //eslint-disable-line

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext<[State, Actions]>(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
