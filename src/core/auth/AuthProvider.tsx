'use client';

import {
  useReducer,
  useCallback,
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
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
  notifications?: Notification[];
};

type Actions = {
  setError: (x: string) => void;
  setProfile: (x: ProfileInput) => void;
  setView: (x: React.ReactNode) => void;
  actionSignOut: () => void;
  setNotifications?: (x: Notification[]) => void;
};

export const AuthContext = createContext<[State, Actions]>([null, null]);
AuthContext.displayName = 'AuthContext';

interface AuthProviderProps {
  defaultUser: User;
  defaultProfile: ProfileInput;
  children: ReactNode;
  defaultNotifications: Notification[];
}

function reducer(
  state: State,
  { type, payload }: { type: string; payload: any }
) {
  return {
    ...state,
    [type]: payload,
  };
}

export const AuthProvider = ({
  defaultUser,
  defaultProfile,
  children,
  defaultNotifications,
}: AuthProviderProps) => {
  const router = useRouter();
  const pathName = usePathname();

  const [notifications, setNotifications] = useState(defaultNotifications);

  const [state, dispatch] = useReducer(reducer, {
    loading: true,
    authenticated: Boolean(defaultUser?.id),
    user: defaultUser,
    profile: defaultProfile,
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
          setNotifications([]);
        }
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (state?.user?.id) {
      const channel = supabase
        .channel('notifications')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'notifications',
            filter: `to=eq.${state.user.id}`,
          },
          (payload: any) => {
            console.log(payload);
            if (payload.eventType === 'INSERT') {
              setNotifications((notifications) => [
                payload.new,
                ...notifications,
              ]);
              toast.success(payload.new.message);
            } 
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [state.user?.id]);

  const value = useMemo((): [State, Actions] => {
    return [
      { ...state, notifications } as State,
      {
        setError,
        setView,
        setProfile,
        actionSignOut,
        setNotifications,
      },
    ];
  }, [state, notifications]); //eslint-disable-line

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext<[State, Actions]>(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
