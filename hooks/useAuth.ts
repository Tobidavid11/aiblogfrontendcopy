import { useState, useEffect } from "react";
import { User } from "@/types/auth";
import { isAuthenticated, assertUserAuthenticated } from "@/lib/auth";

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true,
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (isAuthenticated()) {
          const { user } = await assertUserAuthenticated();
          setAuthState({
            isAuthenticated: true,
            user,
            loading: false,
          });
        } else {
          setAuthState({
            isAuthenticated: false,
            user: null,
            loading: false,
          });
        }
      } catch (error) {
        setAuthState({
          isAuthenticated: false,
          user: null,
          loading: false,
        });
      }
    };

    checkAuth();
  }, []);

  return authState;
};
