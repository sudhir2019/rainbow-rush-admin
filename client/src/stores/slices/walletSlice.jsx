import { createSlice } from "@reduxjs/toolkit";
import { fetchWalletsById, creditTransferAsync, creditAdjustAsync, createWallet, deleteWallet, fetchWalletsAsync, updateWallet } from "../actions/walletAction";

let initialState = {
    wallets: [],
    wallet: {},
    isWalletLoading: false,
    walletMessage: null,
    walletwalletError: null,
}

// Wallet Slice
const walletSlice = createSlice({
    name: "wallet",
    initialState,
    reducers: {
        clearWalletMessage(state) {
            state.walletMessage = null;
        },
        clearWalletError(state) {
            state.walletError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Wallets
            .addCase(fetchWalletsAsync.pending, (state) => {
                state.isWalletLoading = true;
                state.walletError = null;
            })
            .addCase(fetchWalletsAsync.fulfilled, (state, action) => {
                state.isWalletLoading = false;
                state.wallets = action.payload;
            })
            .addCase(fetchWalletsAsync.rejected, (state, action) => {
                state.isWalletLoading = false;
                state.walletError = action.payload;
            });
        builder
            // Get Wallet by ID
            .addCase(fetchWalletsById.pending, (state) => {
                state.isWalletLoading = true;
                state.walletError = null;
            })
            .addCase(fetchWalletsById.fulfilled, (state, action) => {
                state.isWalletLoading = false;
                state.wallet = action.payload;
            })
            .addCase(fetchWalletsById.rejected, (state, action) => {
                state.isWalletLoading = false;
                state.walletError = action.payload;
            });

        // Credit transfer
        builder
            .addCase(creditTransferAsync.pending, (state) => {
                state.isWalletLoading = true;
            })
            .addCase(creditTransferAsync.fulfilled, (state, action) => {
                const { data } = action.payload
                state.isWalletLoading = false;
                state.wallets = data.wallets;
                state.wallet = data.receiverWallet;
                state.walletMessage = 'Credit transfer successful';
                state.walletError = null;
            })
            .addCase(creditTransferAsync.rejected, (state, action) => {
                state.isWalletLoading = false;
                state.walletError = action.payload;
            });

        // Credit transfer
        builder
            .addCase(creditAdjustAsync.pending, (state) => {
                state.isWalletLoading = true;
            })
            .addCase(creditAdjustAsync.fulfilled, (state, action) => {
                const { data } = action.payload
                state.isWalletLoading = false;
                state.wallets = data.wallets;
                state.wallet = data.receiverWallet;
                state.walletMessage = 'Credit transfer successful';
                state.walletError = null;
            })
            .addCase(creditAdjustAsync.rejected, (state, action) => {
                state.isWalletLoading = false;
                state.walletError = action.payload;
            });
        builder
            // Update Wallet
            .addCase(updateWallet.pending, (state) => {
                state.isWalletLoading = true;
                state.walletError = null;
            })
            .addCase(updateWallet.fulfilled, (state, action) => {
                state.isWalletLoading = false;
                state.walletMessage = "Wallet updated successfully!";
                const index = state.wallets.findIndex((wallet) => wallet._id === action.payload._id);
                if (index !== -1) {
                    state.wallets[index] = action.payload;
                }
            })
            .addCase(updateWallet.rejected, (state, action) => {
                state.isWalletLoading = false;
                state.walletError = action.payload;
            });
        builder
            // Create Wallet
            .addCase(createWallet.pending, (state) => {
                state.isWalletLoading = true;
                state.walletError = null;
            })
            .addCase(createWallet.fulfilled, (state, action) => {
                state.isWalletLoading = false;
                state.walletMessage = "Wallet created successfully!";
                state.wallets.push(action.payload);
            })
            .addCase(createWallet.rejected, (state, action) => {
                state.isWalletLoading = false;
                state.walletError = action.payload;
            });
        builder
            // Delete Wallet
            .addCase(deleteWallet.pending, (state) => {
                state.isWalletLoading = true;
                state.walletError = null;
            })
            .addCase(deleteWallet.fulfilled, (state, action) => {
                state.isWalletLoading = false;
                state.walletMessage = "Wallet deleted successfully!";
                state.wallets = state.wallets.filter((wallet) => wallet._id !== action.payload);
            })
            .addCase(deleteWallet.rejected, (state, action) => {
                state.isWalletLoading = false;
                state.walletError = action.payload;
            });
    },
});
export const { clearwalletMessage, clearwalletError } = walletSlice.actions;

export default walletSlice.reducer;