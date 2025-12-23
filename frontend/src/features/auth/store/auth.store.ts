import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
    id: number;
    employeeCode: string;
    name: string;
    role: string;
    // Thêm các trường khác nếu cần
};

type AuthState = {
    user: User | null;
    accessToken: string | null;
    login: (data: { user: User; accessToken: string }) => void;
    logout: () => void;
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            login: (data) => set({ user: data.user, accessToken: data.accessToken }),
            logout: () => set({ user: null, accessToken: null }),
        }),
        { name: 'auth-storage' }
    )
);