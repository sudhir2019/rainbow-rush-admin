import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { createCompany, updateCompany } from "../../../stores/actions/companieAction";
import { clearCompaniesError, clearCompaniesMessage } from "../../../stores/slices/companieSlice";

/**
 * Hook for managing company creation/updating and related states
 * @returns {Object} Company management functions and states
 */
export const useCompanyActions = () => {
    const dispatch = useDispatch();
    const { companiesLoading, companiesError, companiesMessage } = useSelector((state) => state.companies);

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

    const addCompany = useCallback(async (companyData) => {
        try {
            await dispatch(createCompany(companyData)).unwrap();
            return true;
        } catch (error) {
            console.error("Error creating company:", error?.message || error);
            return false;
        }
    }, [dispatch]);

    const editCompany = useCallback(async (id, companyData) => {
        try {
            await dispatch(updateCompany({ id, ...companyData })).unwrap();
            return true;
        } catch (error) {
            console.error("Error updating company:", error?.message || error);
            return false;
        }
    }, [dispatch]);

    const clearError = useCallback(() => {
        dispatch(clearCompaniesError());
    }, [dispatch]);

    const clearMessage = useCallback(() => {
        dispatch(clearCompaniesMessage());
    }, [dispatch]);

    return {
        companiesLoading,
        companiesError,
        companiesMessage,
        addCompany,
        editCompany,
        clearError,
        clearMessage,
    };
}; 