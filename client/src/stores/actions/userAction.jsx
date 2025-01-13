import { createAsyncThunk } from "@reduxjs/toolkit";
import { POST, PUT, GET, DELETE } from "../../utils/http";
import { handleError } from "../../utils/error";
import { getToken } from "../../utils/authUtils"; // Importing the getToken utility function

export const fetchAllUsersAsync = createAsyncThunk(
    'users/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const token = getToken(); // Retrieve token from authUtils
            const { response, json } = await GET("users/", token);

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

export const deleteUserAsync = createAsyncThunk(
    'users/delete',
    async (userId, { rejectWithValue }) => {
        try {
            const token = getToken(); // Retrieve token from authUtils
            const { response, json } = await DELETE(`users/${userId}`, token);

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
