import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

const initialState = {
    library: [],
    currentBook: null,
    loading: false,
    error: null,
};

export const fetchBooks = createAsyncThunk(
    'books/fetchBooks',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/');
            // Handle both object and array response (backend sends object)
            const data = response.data;
            return Array.isArray(data) ? data : Object.values(data);
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const fetchBookDetails = createAsyncThunk(
    'books/fetchBookDetails',
    async (isbn, { rejectWithValue }) => {
        try {
            const response = await api.get(`/isbn/${isbn}`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch book details');
        }
    }
);

export const addReview = createAsyncThunk(
    'books/addReview',
    async ({ isbn, review }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/customer/auth/review/${isbn}`, { review });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to add review');
        }
    }
);

export const deleteReview = createAsyncThunk(
    'books/deleteReview',
    async (isbn, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/customer/auth/review/${isbn}`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Failed to delete review');
        }
    }
);

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.loading = false;
                state.library = action.payload;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchBookDetails.pending, (state) => {
                state.loading = true;
                state.currentBook = null;
                state.error = null;
            })
            .addCase(fetchBookDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.currentBook = action.payload;
            })
            .addCase(fetchBookDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default booksSlice.reducer;
