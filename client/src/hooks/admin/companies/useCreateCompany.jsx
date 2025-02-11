import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { createCompany } from "../../../stores/actions/companieAction";
import { clearCompaniesError, clearCompaniesMessage } from "../../../stores/slices/companieSlice";
import { useFetchGames } from '../games/useFetchGames';
import { useForm } from "react-hook-form";
export const useCompanyActions = () => {
    const dispatch = useDispatch();
    const { companiesLoading, companiesError, companiesMessage } = useSelector((state) => state.companies);
    const { games, isLoading, fetchAllGames } = useFetchGames();
    const { authUser } = useSelector((state) => state.auth);
    // Fetch games on mount
    useEffect(() => {
        fetchAllGames();
    }, []);

    // Initialize react-hook-form
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username: "",
            password: "",
            commissionAmount: "",
            name: "",
            note: "",
            status: "true",
            games: [],
            refId: authUser?.refId || "Super Admin Not Available",
        },
    });

    // Auto-clear messages/errors after 5 seconds
    useEffect(() => {
        if (companiesError || companiesMessage) {
            const timeoutId = setTimeout(() => {
                dispatch(clearCompaniesError());
                dispatch(clearCompaniesMessage());
            }, 5000);

            return () => clearTimeout(timeoutId);
        }
    }, [companiesError, companiesMessage, dispatch]);

    // Add company function
    const addCompany = useCallback(
        async (companyData) => {
            try {
                await dispatch(createCompany(companyData)).unwrap();
                reset(); // Reset form after success
                return true;
            } catch (error) {
                console.error("Error creating company:", error?.message || error);
                return false;
            }
        },
        [dispatch, reset]
    );

    // Form submission handler
    const onSubmit = (data) => addCompany(data);

    return {
        register,
        handleSubmit: handleSubmit(onSubmit),
        setValue,
        reset,
        errors,
        games,
        isLoading,
        companiesLoading,
        companiesMessage,
        companiesError
    };
};
