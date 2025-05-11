import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    email: string | null;
    userName: string | null;
    isAuth: boolean;
}

const initialState: AuthState = {
    email: null,
    userName: null,
    isAuth: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ email: string; userName: string }>) => {
            state.email = action.payload.email;
            state.userName = action.payload.userName;
            state.isAuth = true;
        },
        clearUser: (state) => {
            state.email = null;
            state.userName = null;
            state.isAuth = false;
        },
    },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
