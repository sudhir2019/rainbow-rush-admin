import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { createGame } from "../../../stores/actions/gameActions";
import { clearGamesError, clearGamesMessage } from "../../../stores/slices/gameSlice";
import { useForm } from "react-hook-form";
/**
 * Hook for managing game creation and related states
 * @returns {Object} Game creation functions and states
 */
export const useCreateGame = () => {
    const dispatch = useDispatch();
    const { gamesLoading, gamesError, gamesMessage } = useSelector((state) => state.games);
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            gameName: "",
            gameDescription: "",
            releaseDate: "",
            publisher: "",
            nodigit: 0,
            gameStatus: "active",
        },
    });
    // Auto-clear messages/errors after 5 seconds
    useEffect(() => {
        let timeoutId;
        if (gamesError || gamesMessage) {
            timeoutId = setTimeout(() => {
                if (gamesError) dispatch(clearGamesError());
                if (gamesMessage) dispatch(clearGamesMessage());
            }, 5000);
        }
        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [gamesError, gamesMessage, dispatch]);

    const addGame = useCallback(async (gameData) => {
        try {
            await dispatch(createGame(gameData)).unwrap();
            return true;
        } catch (error) {
            console.error("Error creating game:", error?.message || error);
            return false;
        }
    }, [dispatch]);
    const onSubmit = async (data) => {
        try {
            const formData = {
                ...data,
                nodigit: parseInt(data.nodigit)
            };
            await dispatch(createGame(formData)).unwrap();
            reset(); // Reset form after successful creation
        } catch (error) {
            console.error("Error creating game:", error?.message || error);
        }
    };
    const clearError = useCallback(() => {
        dispatch(clearGamesError());
    }, [dispatch]);

    const clearMessage = useCallback(() => {
        dispatch(clearGamesMessage());
    }, [dispatch]);

    return {
        gamesLoading,
        gamesError,
        gamesMessage,
        addGame,
        clearError,
        clearMessage,
        onSubmit,
        register,
        handleSubmit,
        setValue,
        reset,
        errors,
    };
};