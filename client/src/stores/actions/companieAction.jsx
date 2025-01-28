import { createAsyncThunk } from "@reduxjs/toolkit";
import { POST, PUT, GET, DELETE } from "../../utils/http";
import { handleError } from "../../utils/error";

// Async Thunks
export const fetchCompanies = createAsyncThunk(
    "companies/fetchCompanies",
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = getState();  // Log the entire state to confirm it's accessible
            const { token } = state.auth;
            const { response, json } = await GET("companies/", token);
            if (response.status === 201) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

export const createCompany = createAsyncThunk(
    "companies/createCompany",
    async (companyData, { getState, rejectWithValue }) => {
        try {
            const state = getState();  // Log the entire state to confirm it's accessible
            const { token } = state.auth;
            const { response, json } = await POST("/companies", companyData, token);
            if (response.status === 201) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

export const updateCompanyById = createAsyncThunk(
    "companies/updateCompanyById",
    async ({ id, updatedData }, { getState, rejectWithValue }) => {
        try {
            const state = getState();  // Log the entire state to confirm it's accessible
            const { token } = state.auth;
            const { response, json } = await PUT(`/companies/${id}`, updatedData, token);
            if (response.status === 201) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

export const deleteCompanyById = createAsyncThunk(
    "companies/deleteCompanyById",
    async (id, { getState, rejectWithValue }) => {
        try {
            const state = getState();  // Log the entire state to confirm it's accessible
            const { token } = state.auth;
            const { response, json } = await DELETE(`/companies/${id}`, token);
            if (response.status === 201) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

export const addGameToCompany = createAsyncThunk(
    "companies/addGameToCompany",
    async ({ companyId, gameId }, { getState, rejectWithValue }) => {
        try {
            const state = getState();  // Log the entire state to confirm it's accessible
            const { token } = state.auth;
            const { response, json } = await POST(`/companies/:${companyId}/games/:${gameId}`, token);
            if (response.status === 201) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

export const removeGameFromCompany = createAsyncThunk(
    "companies/removeGameFromCompany",
    async ({ companyId, gameId }, { getState, rejectWithValue }) => {
        try {
            const state = getState();  // Log the entire state to confirm it's accessible
            const { token } = state.auth;
            const { response, json } = await DELETE(`/companies/:${companyId}/games/:${gameId}`, token);
            if (response.status === 201) {
                return json;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);