import { createSlice } from '@reduxjs/toolkit';
import {
    fetchAllUsersAsync,
    fetchUserByIdAsync,
    createUserAsync,
    updateUserProfileAsync,
    deleteUserAsync,
} from "../actions/userAction";


const initialState = {
    isLoading: false,
    isLoggedIn: false,
    users: [],
    user: null,
    error: null,
    message: null,
};


// Redux Slice
const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        clearError(state) {
            state.error = null;
        },
        clearMessage(state) {
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch all users
        builder
            .addCase(fetchAllUsersAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllUsersAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload;
                state.error = null;
            })
            .addCase(fetchAllUsersAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

        // Fetch user by ID
        builder
            .addCase(fetchUserByIdAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUserByIdAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(fetchUserByIdAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

        // Create user
        builder
            .addCase(createUserAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createUserAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users.push(action.payload);
                state.message = 'User created successfully';
                state.error = null;
            })
            .addCase(createUserAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

        // Update user profile
        builder
            .addCase(updateUserProfileAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUserProfileAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = { ...state.user, ...action.payload };
                state.message = 'Profile updated successfully';
                state.error = null;
            })
            .addCase(updateUserProfileAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

        // Delete user
        builder
            .addCase(deleteUserAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteUserAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = state.users.filter((user) => user.id !== action.payload.id);
                state.message = 'User deleted successfully';
                state.error = null;
            })
            .addCase(deleteUserAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { clearError, clearMessage } = usersSlice.actions;
export default usersSlice.reducer;
