import { useDispatch, useSelector } from "react-redux";
import { updateGame } from "../../../stores/actions/gameActions";
import { useForm } from "react-hook-form";
import { useEffect, useMemo } from "react";

export const useUpdateGame = (initialData = {}) => {
    const dispatch = useDispatch();
    const { gamesLoading, gamesError, gamesMessage, games } = useSelector((state) => state.games);

    // Find the current game from Redux if not available in props
    const currentGame = useMemo(() => {
        return games.find((g) => g._id === initialData._id) || initialData;
    }, [games, initialData]);

    // Format the initial data, especially the releaseDate
    const formattedInitialData = useMemo(() => ({
        ...currentGame,
        releaseDate: currentGame.releaseDate ? currentGame.releaseDate.split("T")[0] : "", // Convert to YYYY-MM-DD
    }), [currentGame]);

    // Initialize useForm with formattedInitialData
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
        defaultValues: formattedInitialData,
    });

    // Update form fields when initialData changes
    useEffect(() => {
        reset(formattedInitialData);
    }, [formattedInitialData, reset]);

    const editGame = (gameId, gameData) => {
        dispatch(updateGame({ gameId, gameData }));
    };

    const onSubmit = (data) => {
        if (currentGame._id) {
            editGame(currentGame._id, data);
        }
    };

    return {
        register,
        handleSubmit,
        setValue,
        errors,
        onSubmit,
        gamesLoading,
        gamesError,
        gamesMessage,
    };
};
