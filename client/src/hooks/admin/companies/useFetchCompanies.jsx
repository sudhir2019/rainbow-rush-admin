import { useDispatch, useSelector } from "react-redux";
import { useEffect, useCallback } from "react";
import { fetchCompanies } from "../../../stores/actions/companieAction"; // Adjust the path if necessary
import { clearCompaniesError, clearCompaniesMessage } from "../../../stores/slices/companieSlice"; // Adjust path if needed

/**
 * Hook for managing companies fetching and related states
 * @returns {Object} Companies data and management functions
 */
export const useFetchCompanies = () => {
    const dispatch = useDispatch();
    const {
        companies,
        companiesLoading,
        companiesError,
        companiesMessage,
    } = useSelector((state) => state.companies);

    // Auto-clear messages/errors after 5 seconds
    useEffect(() => {
        let timeoutId;
        if (companiesError || companiesMessage) {
            timeoutId = setTimeout(() => {
                if (companiesError) dispatch(clearCompaniesError());
                if (companiesMessage) dispatch(clearCompaniesMessage());
            }, 5000);
        }
        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [companiesError, companiesMessage, dispatch]);

    // Function to fetch all companies
    const fetchAllCompanies = useCallback(async () => {
        try {
            await dispatch(fetchCompanies()).unwrap();
            return true;
        } catch (error) {
            console.error("Error fetching companies:", error?.message || error);
            return false;
        }
    }, [dispatch]);

    // Function to clear errors manually
    const clearError = useCallback(() => {
        dispatch(clearCompaniesError());
    }, [dispatch]);

    // Function to clear success messages manually
    const clearMessage = useCallback(() => {
        dispatch(clearCompaniesMessage());
    }, [dispatch]);

    return {
        companies,
        companiesLoading,
        companiesError,
        companiesMessage,
        fetchAllCompanies,
        clearError,
        clearMessage,
    };
};
