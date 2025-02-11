import { createSlice } from '@reduxjs/toolkit';
import {
    fetchAllUsersAsync,
    fetchUserByIdAsync,
    createUserAsync,
    updateUserProfileAsync,
    deleteUserAsync,
    updateUserDashboardAsync,
    activateUserAsync,
    fetchUsersByCompanieIdAsync
} from "../actions/userAction";


let initialState = {
    isLoading: false,
    isLoggedIn: false,
    admins: [],
    superdistributers: [],
    distributers: [],
    retailers: [],
    users: [],
    user: [],
    superadmins: [],
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
                const { data } = action.payload;
                state.isLoading = false;
                // Categorize users by their roles
                // Categorize the users by their roles
                // Categorize users by their roles using `name` inside `roles` array
                state.superadmins = data.filter(user => user.roles.some(role => role.name === 'superadmin'));
                state.admins = data.filter(user => user.roles.some(role => role.name === 'admin'));
                state.superdistributers = data.filter(user => user.roles.some(role => role.name === 'superdistributer'));
                state.distributers = data.filter(user => user.roles.some(role => role.name === 'distributer'));
                state.retailers = data.filter(user => user.roles.some(role => role.name === 'retailer'));
                state.user = data.filter(user => user.roles.some(role => role.name === 'user')); // Filter users with 'user' role
                state.users = data;  // All users
                // Optionally, keep all users in a general list as well
                state.error = null;
            })
            .addCase(fetchAllUsersAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
        builder
            .addCase(fetchUsersByCompanieIdAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUsersByCompanieIdAsync.fulfilled, (state, action) => {
                const { data } = action.payload;
                state.isLoading = false;
                // Categorize users by their roles
                // Categorize the users by their roles
                // Categorize users by their roles using `name` inside `roles` array
                state.superadmins = data.filter(user => user.roles.some(role => role.name === 'superadmin'));
                state.admins = data.filter(user => user.roles.some(role => role.name === 'admin'));
                state.superdistributers = data.filter(user => user.roles.some(role => role.name === 'superdistributer'));
                state.distributers = data.filter(user => user.roles.some(role => role.name === 'distributer'));
                state.retailers = data.filter(user => user.roles.some(role => role.name === 'retailer'));
                state.user = data.filter(user => user.roles.some(role => role.name === 'user')); // Filter users with 'user' role
                state.users = data;  // All users
                // Optionally, keep all users in a general list as well
                state.error = null;
            })
            .addCase(fetchUsersByCompanieIdAsync.rejected, (state, action) => {
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
                const { data } = action.payload;
                state.isLoading = false;
                state.superadmins = data.filter(user => user.roles.some(role => role.name === 'superadmin'));
                state.admins = data.filter(user => user.roles.some(role => role.name === 'admin'));
                state.superdistributers = data.filter(user => user.roles.some(role => role.name === 'superdistributer'));
                state.distributers = data.filter(user => user.roles.some(role => role.name === 'distributer'));
                state.retailers = data.filter(user => user.roles.some(role => role.name === 'retailer'));
                state.user = data.filter(user => user.roles.some(role => role.name === 'user')); // Filter users with 'user' role
                state.users = data;
                state.message = 'User created successfully';
                state.error = null;
            })
            .addCase(createUserAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

        // Update user Dashboard
        builder
            .addCase(updateUserDashboardAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUserDashboardAsync.fulfilled, (state, action) => {
                const { data } = action.payload;
                state.isLoading = false;
                state.message = 'Profile updated successfully';
                state.superadmins = data.filter(user => user.roles.some(role => role.name === 'superadmin'));
                state.admins = data.filter(user => user.roles.some(role => role.name === 'admin'));
                state.superdistributers = data.filter(user => user.roles.some(role => role.name === 'superdistributer'));
                state.distributers = data.filter(user => user.roles.some(role => role.name === 'distributer'));
                state.retailers = data.filter(user => user.roles.some(role => role.name === 'retailer'));
                state.user = data.filter(user => user.roles.some(role => role.name === 'user')); // Filter users with 'user' role
                state.users = data;
                state.error = null;
            })
            .addCase(updateUserDashboardAsync.rejected, (state, action) => {
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
                const { data } = action.payload;
                state.isLoading = false;
                state.superadmins = data.filter(user => user.roles.some(role => role.name === 'superadmin'));
                state.admins = data.filter(user => user.roles.some(role => role.name === 'admin'));
                state.superdistributers = data.filter(user => user.roles.some(role => role.name === 'superdistributer'));
                state.distributers = data.filter(user => user.roles.some(role => role.name === 'distributer'));
                state.retailers = data.filter(user => user.roles.some(role => role.name === 'retailer'));
                state.user = data.filter(user => user.roles.some(role => role.name === 'user')); // Filter users with 'user' role
                state.users = data;  // All users
                state.message = 'User deleted successfully';
                state.error = null;
            })
            .addCase(deleteUserAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

        // Activate user
        builder
            .addCase(activateUserAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(activateUserAsync.fulfilled, (state, action) => {
                const { data } = action.payload;
                state.isLoading = false;
                state.superadmins = data.filter(user => user.roles.some(role => role.name === 'superadmin'));
                state.admins = data.filter(user => user.roles.some(role => role.name === 'admin'));
                state.superdistributers = data.filter(user => user.roles.some(role => role.name === 'superdistributer'));
                state.distributers = data.filter(user => user.roles.some(role => role.name === 'distributer'));
                state.retailers = data.filter(user => user.roles.some(role => role.name === 'retailer'));
                state.user = data.filter(user => user.roles.some(role => role.name === 'user')); // Filter users with 'user' role
                state.users = data;  // All users
                state.error = null;
            })
            .addCase(activateUserAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

    },
});

export const { clearError, clearMessage } = usersSlice.actions;
export default usersSlice.reducer;
