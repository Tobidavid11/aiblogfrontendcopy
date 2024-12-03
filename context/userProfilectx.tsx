"use client"
import { getUserProfile } from '@/actions/profile';
import { assertUserAuthenticated } from '@/lib/auth';
import { UserProps } from '@/types/user';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { fcm } from "@/lib/FirebaseConfig/firebaseConfig";
import { getToken, onMessage } from "firebase/messaging";
import { toast } from "sonner";
import {
	NEXT_PUBLIC_FIREBASE_VAPID_KEY } from "@/lib/constants"


interface UserContextProps {
  user: UserProps | null;
  setUser: (user: UserProps) => void;
  clearUser: () => void;
  loading: boolean;
   setLoading: (isLoading: boolean) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  function requestPermission() {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.debug("Notification permission granted.");
      } else {
        console.debug("Notification permission denied.");
      }
    });
  }

  getToken(fcm, { vapidKey: NEXT_PUBLIC_FIREBASE_VAPID_KEY })
    .then((currentToken) => {
      if (currentToken) {
        localStorage.setItem("fcmToken", currentToken);
      } else {
        requestPermission();
      }
    })
    .catch(() => {
      console.debug("An error occurred while retrieving token. ");
    });

  onMessage(fcm, (payload) => {
    toast(payload.notification?.title as string);

});
  const [user, setUserState] = useState<UserProps | null>(null);
   const [loading, setLoading] = useState<boolean>(false);

  const setUser = (newUser: UserProps) => {
    setUserState(newUser);
  };

  const clearUser = () => {
    setUserState(null);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      const userInfo = await assertUserAuthenticated();
      if(userInfo.accessToken.value == ""){
        return
      }
      try { 
        const userProfile = await  getUserProfile(
    userInfo.accessToken.value as string,
    userInfo.userId as string
        )
        if (userProfile) {
          setUserState(userProfile.data);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  },[]); 


  return (
    <UserContext.Provider value={{ user, setUser, clearUser , loading , setLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
