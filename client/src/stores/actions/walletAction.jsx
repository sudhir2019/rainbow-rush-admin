import { createAsyncThunk } from "@reduxjs/toolkit";
import { POST, PUT, GET, DELETE } from "../../utils/http";
import { handleError } from "../../utils/error";
import { getToken } from "../../utils/authUtils"; // Importing the getToken utility function



// Async Thunks
export const fetchWalletsAsync = createAsyncThunk(
    "wallet/fetchWalletsAsync",
    async (_, { rejectWithValue }) => {
        try {
            const token = getToken(); // Retrieve token from authUtils
            const { response, json } = await GET(`wallet/`, token);
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

export const fetchWalletsById = createAsyncThunk(
    "wallet/fetchWalletsById",
    async (userId, { rejectWithValue }) => {
        try {
            const token = getToken(); // Retrieve token from authUtils
            const { response, json } = await GET(`wallet/:${userId}`, token);
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
export const creditTransferAsync = createAsyncThunk(
    'wallet/creditTransfer',
    async (data, { rejectWithValue }) => {
        try {
            const token = getToken(); // Retrieve token from authUtils
            const { response, json } = await POST("wallet/creditTransfer", data, token);
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

export const creditAdjustAsync = createAsyncThunk(
    'wallet/creditAdjust',
    async (data, { rejectWithValue }) => {
        try {
            const token = getToken(); // Retrieve token from authUtils
            const { response, json } = await POST("wallet/creditAdjust", data, token);
            if (response.status === 200) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);
export const updateWallet = createAsyncThunk(
    "wallet/updateWallet",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const token = getToken(); // Retrieve token from authUtils
            const { response, json } = await PUT(`wallet/${id}`, data, token);
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

export const createWallet = createAsyncThunk(
    "wallet/createWallet",
    async (data, { rejectWithValue }) => {
        try {
            const token = getToken(); // Retrieve token from authUtils
            const { response, json } = await POST("wallet/", data, token);
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

export const deleteWallet = createAsyncThunk(
    "wallet/deleteWallet",
    async (id, { rejectWithValue }) => {
        try {
            const token = getToken(); // Retrieve token from authUtils
            const { response, json } = await DELETE(`wallet/${id}`, token);
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