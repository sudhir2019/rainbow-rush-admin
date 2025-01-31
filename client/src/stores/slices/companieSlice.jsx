import { createSlice } from "@reduxjs/toolkit";
import {
    fetchCompanies,
    createCompany,
    updateCompanyById,
    deleteCompanyById,
    addGameToCompany,
    removeGameFromCompany,
    activateCompanyAsync
} from "../actions/companieAction";

const initialState = {
    companies: [],
    companiesLoading: false,
    companiesError: null,
    companiesMessage: null,
    lastUpdated: null,
    companieDeleted: false,
};

const companieSlice = createSlice({
    name: "companies",
    initialState,
    reducers: {
        clearCompaniesError: (state) => {
            state.companiesError = null;
        },
        clearCompaniesMessage: (state) => {
            state.companiesMessage = null;
        },
        setCompaniesDeleted: (state) => {
            state.companieDeleted = true;
        },
    },
    extraReducers: (builder) => {
        // Fetch Companies
        builder
            .addCase(fetchCompanies.pending, (state) => {
                state.companiesLoading = true;
                state.companiesError = null;
            })
            .addCase(fetchCompanies.fulfilled, (state, action) => {
                state.companiesLoading = false;
                state.companies = action.payload.data;
                state.companiesMessage = "Companies fetched successfully";
            })
            .addCase(fetchCompanies.rejected, (state, action) => {
                state.companiesLoading = false;
                state.companiesError = action.payload;
            })

            // Create Company
            .addCase(createCompany.pending, (state) => {
                state.companiesLoading = true;
                state.companiesError = null;
            })
            .addCase(createCompany.fulfilled, (state, action) => {
                state.companiesLoading = false;
                state.companies.push(action.payload.company);
                state.companiesMessage = "Company created successfully";
            })
            .addCase(createCompany.rejected, (state, action) => {
                state.companiesLoading = false;
                state.companiesError = action.payload;
            })

            // Update Company
            .addCase(updateCompanyById.pending, (state) => {
                state.companiesLoading = true;
                state.companiesError = null;
            })
            .addCase(updateCompanyById.fulfilled, (state, action) => {
                state.companiesLoading = false;
                const updatedCompany = action.payload.company;
                const index = state.companies.findIndex(
                    (company) => company._id === updatedCompany._id
                );
                if (index !== -1) {
                    state.companies[index] = updatedCompany;
                }
                state.companiesMessage = "Company updated successfully";
            })
            .addCase(updateCompanyById.rejected, (state, action) => {
                state.companiesLoading = false;
                state.companiesError = action.payload;
            })

            // Delete Company
            .addCase(deleteCompanyById.pending, (state) => {
                state.companiesLoading = true;
                state.companiesError = null;
            })
            .addCase(deleteCompanyById.fulfilled, (state, action) => {
                state.companiesLoading = false;
                console.log(action.payload.data)
                state.companies = action.payload.data;
                state.companiesMessage = "Company deleted successfully";
            })
            .addCase(deleteCompanyById.rejected, (state, action) => {
                state.companiesLoading = false;
                state.companiesError = action.payload;
            })

            // Add Game to Company
            .addCase(addGameToCompany.pending, (state) => {
                state.companiesLoading = true;
                state.companiesError = null;
            })
            .addCase(addGameToCompany.fulfilled, (state, action) => {
                state.companiesLoading = false;
                const { companyId, game } = action.payload;
                const company = state.companies.find((c) => c._id === companyId);
                if (company) {
                    company.games.push(game);
                }
                state.companiesMessage = "Game added to company successfully";
            })
            .addCase(addGameToCompany.rejected, (state, action) => {
                state.companiesLoading = false;
                state.companiesError = action.payload;
            })

            // Remove Game from Company
            .addCase(removeGameFromCompany.pending, (state) => {
                state.companiesLoading = true;
                state.companiesError = null;
            })
            .addCase(removeGameFromCompany.fulfilled, (state, action) => {
                state.companiesLoading = false;
                const { companyId, gameId } = action.payload;
                const company = state.companies.find((c) => c._id === companyId);
                if (company) {
                    company.games = company.games.filter((game) => game._id !== gameId);
                }
                state.companiesMessage = "Game removed from company successfully";
            })
            .addCase(removeGameFromCompany.rejected, (state, action) => {
                state.companiesLoading = false;
                state.companiesError = action.payload;
            })

            .addCase(activateCompanyAsync.pending, (state) => {
                state.companiesLoading = true;
                state.companiesError = null;
                state.companiesMessage = null;
            })
            .addCase(activateCompanyAsync.fulfilled, (state, action) => {
                state.companiesLoading = false;
                state.companies = action.payload.data;
                state.companiesMessage = action.payload.message;
                state.lastUpdated = new Date().toISOString();
                state.companiesError = null;
            })
            .addCase(activateCompanyAsync.rejected, (state, action) => {
                state.companiesLoading = false;
                state.companiesError = action.payload || "Failed to update game status";
            });
    },
});

export const { clearCompaniesError, clearCompaniesMessage, setCompaniesDeleted } = companieSlice.actions;
export default companieSlice.reducer;
