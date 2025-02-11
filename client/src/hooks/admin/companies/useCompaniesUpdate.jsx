// hooks/useCompaniesUpdate.js
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { updateCompanyById } from "../../../stores/actions/companieAction";
import { useFetchGames } from '../games/useFetchGames';

export const useCompaniesUpdate = () => {
    const { any: companyId } = useParams(); // Get company ID from URL
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { games, isLoading, fetchAllGames } = useFetchGames();
    const { companies, companiesLoading, companiesError } = useSelector((state) => state.companies);
    const { gamesLoading } = useSelector((state) => state.games); // Fetching games from Redux store
    const [company, setCompany] = useState(null);
    // Fetch games on mount
    useEffect(() => {
        fetchAllGames();
    }, []);
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (companies.length > 0) {
            const foundCompany = companies.find((c) => c._id === companyId);
            if (foundCompany) {
                setCompany(foundCompany);
                Object.keys(foundCompany).forEach((key) => setValue(key, foundCompany[key]));
            }
        }
    }, [companyId, companies, setValue]);

    const onSubmit = async (data) => {
        const maindata = {
            name: data.name,
            games: data.games,
            note: data.note
        }
        try {
            await dispatch(updateCompanyById({ companyId, maindata })).unwrap();
        } catch (error) {
            console.error("Error updating company:", error);
        }
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        errors,
        navigate,
        company,
        companiesLoading,
        companiesError,
        games,
        gamesLoading,
    };
};
