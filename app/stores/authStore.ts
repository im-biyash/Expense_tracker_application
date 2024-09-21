import { create } from "zustand";
import { persist,createJSONStorage  } from "zustand/middleware";

interface AuthState {
  username: string | null;
  email: string | null;
  token: string | null;
  role: string | null;
  isLoggedIn: boolean;
  login: (payload: { username: string; email: string; token: string; role: string }) => void;
  logout: () => void;
}

const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      username: null,
      email: null,
      token: null,
      role: null,
      isLoggedIn: false,

      login: ({ username, email, token, role }) => {
        set({
          username,
          email,
          token,
          role,
          isLoggedIn: true,
        });
      },

      logout: () => {
        set({
          username: null,
          email: null,
          token: null,
          role: null,
          isLoggedIn: false,
        });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage), // Key to store data in localStorage
     // Use localStorage for persistence
    }
  )
);

export default useAuthStore;
