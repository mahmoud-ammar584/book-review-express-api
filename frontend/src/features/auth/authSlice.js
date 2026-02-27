import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

const initialState = {
    user: localStorage.getItem('username'),
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
    loading: false,
    error: null,
};

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            // Clear any old stale tokens first
            localStorage.removeItem('token');
            localStorage.removeItem('username');

            const response = await api.post('/customer/login', { username, password });

            // Explicitly check that we got a valid token back
            if (!response.data.accessToken) {
                return rejectWithValue(response.data.message || 'Login failed - no token received');
            }

            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('username', response.data.username || username);

            return {
                username: response.data.username || username,
                token: response.data.accessToken
            };
        } catch (err) {
            // Clear tokens on failed login too
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            return rejectWithValue(err.response?.data?.message || 'Login failed');
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const response = await api.post('/register', { username, password });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Registration failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
            localStorage.removeItem('username');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.username;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
