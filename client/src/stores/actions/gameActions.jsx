import { createAsyncThunk } from "@reduxjs/toolkit";
import { POST, PUT, GET, DELETE } from "../../utils/http";
import { handleError } from "../../utils/error";

// Async Thunks
export const fetchGames = createAsyncThunk(
    "games/fetchGames",
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const { token } = state.auth;

            if (!token) {
                return rejectWithValue("Please log in to access games");
            }

            const { response, json } = await GET("game/", token);
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

export const createGame = createAsyncThunk(
    "games/createGame",
    async (gameData, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const { token } = state.auth;

            if (!token) {
                return rejectWithValue("Authentication token is missing");
            }

            if (!gameData) {
                return rejectWithValue("Game data is required");
            }

            const { response, json } = await POST("game", gameData, token);
            console.log(response)
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

export const updateGame = createAsyncThunk(
    "games/updateGame",
    async ({ gameId, gameData }, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const { token } = state.auth;

            if (!token) {
                return rejectWithValue("Authentication token is missing");
            }

            if (!gameId) {
                return rejectWithValue("Game ID is required");
            }

            if (!gameData || Object.keys(gameData).length === 0) {
                return rejectWithValue("Valid game data is required");
            }

            const { response, json } = await PUT(`game/${gameId}`, gameData, token);

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

export const deleteGame = createAsyncThunk(
    "games/deleteGame",
    async (gameId, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const { token } = state.auth;

            if (!token) {
                return rejectWithValue("Authentication token is missing");
            }

            if (!gameId) {
                return rejectWithValue("Game ID is required");
            }

            const { response, json } = await DELETE(`game/:${gameId}`, token);

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

export const activateGameAsync = createAsyncThunk(
    'games/:id/:action',
    async ({ gameId, action }, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const { token } = state.auth; // Retrieve token from authUtils
            const { response, json } = await PUT(`game/:${gameId}/${action}`, { status: action }, token, "json"); // Adjust `info` if backend requires it
            if (response.status === 200) {
                return response.data;
            }
            return rejectWithValue(handleError(json));
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);