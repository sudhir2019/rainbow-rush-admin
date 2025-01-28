import { createSlice } from "@reduxjs/toolkit";

import { fetchGames, createGame, updateGame, deleteGame,activateGameAsync } from '../actions/gameActions'
// Game slice
const gameSlice = createSlice({
    name: "games",
    initialState: {
        games: [],
        currentGame: null,
        gamesLoading: false,
        gamesError: null,
        gamesMessage: null,
        lastUpdated: null,
        gameDeleted: false,
        lastFetchAttempt: null,
    },
    reducers: {
        clearGamesError: (state) => {
            state.gamesError = null;
        },
        clearGamesMessage: (state) => {
            state.gamesMessage = null;
        },
        setCurrentGame: (state, action) => {
            state.currentGame = action.payload;
        },
        setGameDeleted: (state) => {
            state.gameDeleted = true;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch all games
            .addCase(fetchGames.pending, (state) => {
                state.gamesLoading = true;
                state.gamesError = null;
                state.gamesMessage = null;
                state.lastFetchAttempt = new Date().toISOString();
            })
            .addCase(fetchGames.fulfilled, (state, action) => {
                state.gamesLoading = false;
                state.games =action.payload.data;
                state.gamesMessage = "Games fetched successfully";
                state.lastUpdated = new Date().toISOString();
                state.gamesError = null;
            })
            .addCase(fetchGames.rejected, (state, action) => {
                state.gamesLoading = false;
                state.gamesError = action.payload || "Failed to fetch games. Please try again later.";
                state.games = state.games || [];
            })

            // Create a new game
            .addCase(createGame.pending, (state) => {
                state.gamesLoading = true;
                state.gamesError = null;
                state.gamesMessage = null;
            })
            .addCase(createGame.fulfilled, (state, action) => {
                console.log(action.payload)
                state.gamesLoading = false;
                state.games = action.payload.data; 
                state.gamesMessage = "Game created successfully";
                state.lastUpdated = new Date().toISOString();
            })
            .addCase(createGame.rejected, (state, action) => {
                state.gamesLoading = false;
                state.gamesError = action.payload || "Failed to create game";
            })
            // Update a game by ID
            .addCase(updateGame.pending, (state) => {
                state.gamesLoading = true;
                state.gamesError = null;
                state.gamesMessage = null;
            })
            .addCase(updateGame.fulfilled, (state, action) => {
                state.gamesLoading = false;
                state.games = state.games.map((game) =>
                    game._id === action.payload._id ? action.payload : game
                );
                state.currentGame = action.payload;
                state.gamesMessage = `Game "${action.payload.title || action.payload.name}" updated successfully`;
                state.lastUpdated = new Date().toISOString();
            })
            .addCase(updateGame.rejected, (state, action) => {
                state.gamesLoading = false;
                state.gamesError = action.payload || "Failed to update game";
            })

            // Delete a game by ID
            .addCase(deleteGame.pending, (state) => {
                state.gamesLoading = true;
                state.gamesError = null;
            })
            .addCase(deleteGame.fulfilled, (state, action) => {
                state.gamesLoading = false;
                state.games = state.games.filter((game) => game._id !== action.meta.arg);
                state.gamesMessage = "Game deleted successfully";
                state.lastUpdated = new Date().toISOString();
            })
            .addCase(deleteGame.rejected, (state, action) => {
                state.gamesLoading = false;
                state.gamesError = action.payload;
            })
            .addCase(activateGameAsync.pending, (state) => {
                state.gamesLoading = true;
                state.gamesError = null;
                state.gamesMessage = null;
            })
            .addCase(activateGameAsync.fulfilled, (state, action) => {
                state.gamesLoading = false;
                state.games = action.payload.data;
                state.gamesMessage = action.payload.message;
                state.lastUpdated = new Date().toISOString();
                state.gamesError = null;
            })
            .addCase(activateGameAsync.rejected, (state, action) => {
                state.gamesLoading = false;
                state.gamesError = action.payload || "Failed to update game status";
            });
    },
});

// Export actions individually for better clarity
export const gameActions = gameSlice.actions;

// Export individual actions
export const {
    clearGamesError,
    clearGamesMessage,
    setCurrentGame,
    setGameDeleted
} = gameSlice.actions;

export default gameSlice.reducer;