import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice'; // Ensure this points to the correct theme slice file
import appReducer from './slices/appSlice'; // Ensure this path is correct
import authReducer from './slices/authSlice'
import usersReducer from './slices/userSlice'
import walletReducer from './slices/walletSlice'
// Create a Redux store containing our reducers.
export const store = configureStore({
    reducer: {
        app: appReducer,
        theme: themeReducer,
        auth: authReducer,
        wallets: walletReducer,
        users: usersReducer,
    },
});
// Rehydrate auth state from localStorage on app load
const token = localStorage.getItem("authToken");
const roles = localStorage.getItem("authRoles");

if (token) {
    store.dispatch({
        type: "auth/loginAsync/fulfilled",
        payload: {
            token,
            roles: roles ? JSON.parse(roles) : [],
        },
    });
}
// Define RootState and AppDispatch for usage in your components
export const RootState = () => store.getState();
export const AppDispatch = () => store.dispatch();
