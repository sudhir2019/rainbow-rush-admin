import { createAsyncThunk } from "@reduxjs/toolkit";
import { POST, PUT, GET, DELETE } from "../../utils/http";
import { handleError } from "../../utils/error";
import { getToken } from "../../utils/authUtils"; // Importing the getToken utility function

export const fetchAllUsersAsync = createAsyncThunk(
    'users/fetchAll',
    async (role, { rejectWithValue }) => {
        try {
            const token = getToken(); // Retrieve token from authUtils
            if (role) {
                const { response, json } = await GET(`users?role=${role}`, token);
                // Successful response
                if (response.status === 200) {
                    return json;
                }
            }
            const { response, json } = await GET(`users/`, token);
            // Successful response
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);
export const fetchUserByIdAsync = createAsyncThunk(
    'users/fetchById',
    async (userId, { rejectWithValue }) => {
        try {
            const token = getToken(); // Retrieve token from authUtils
            const { response, json } = await GET(`users/${userId}`, token);

            // Successful response
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);
export const createUserAsync = createAsyncThunk(
    'users/create',
    async (userData, { rejectWithValue }) => {
        try {
            const token = getToken(); // Retrieve token from authUtils
            const { response, json } = await POST("users/", userData, token);
            // Successful response
            if (response.status === 201) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);
export const updateUserProfileAsync = createAsyncThunk(
    'users/updateProfile',
    async (userData, { rejectWithValue }) => {
        try {
            const token = getToken(); // Retrieve token from authUtils
            const { response, json } = await PUT(`users/me`, userData, token);

            // Successful response
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);
export const updateUserDashboardAsync = createAsyncThunk(
    'users/updateUserDashboard',
    async ({ userData, id }, { rejectWithValue }) => { // Ensure we destructure properly here
        try {
            const token = getToken(); // Retrieve token from authUtils
            const { response, json } = await PUT(`users/admin/${id}`, userData, token, "json"); // Fixed the URL format

            // Successful response
            if (response.status === 200) {
                return json; // Returns the response JSON if successful
            }
            // If the response is not OK, reject with the error message
            return rejectWithValue(handleError(json)); // Correct usage of rejectWithValue
        } catch (error) {
            return rejectWithValue(handleError(error)); // Catch and handle unexpected errors
        }
    }
);
export const activateUserAsync = createAsyncThunk(
    'users/:id/:action',
    async ({ userId, action }, { rejectWithValue }) => {
        const token = getToken();
        try {
            const { response, json } = await PUT(`users/:${userId}/${action}`, { status: action }, token, "json"); // Adjust `info` if backend requires it
            if (response.status === 200) {
                return response.data;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);
export const deleteUserAsync = createAsyncThunk(
    'users/delete',
    async (userId, { rejectWithValue }) => {
        try {
            const token = getToken(); // Retrieve token from authUtils
            const { response, json } = await DELETE(`users/${userId}`, token);
            console.log(json)
            // Successful response
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);
