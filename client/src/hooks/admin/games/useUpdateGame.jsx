import { useDispatch, useSelector } from "react-redux";
import { updateGame } from "../../../stores/actions/gameActions"; // Update the path to your slice as necessary

// Hook for updating a game
export const useUpdateGame = () => {
    const dispatch = useDispatch();
    const {
        gamesLoading,
        gamesError,
        gamesMessage,
        currentGame,
        clearGamesMessage,
        clearGamesError
    } = useSelector((state) => state.games);

    const editGame = (gameId, gameData) => {
        dispatch(updateGame({ gameId, gameData }));
    };

    const clearError = () => {
        dispatch(clearGamesError());
    };

    const clearMessage = () => {
        dispatch(clearGamesMessage());
    };

    return {
        gamesLoading,
        gamesError,
        gamesMessage,
        currentGame,
        editGame,
        clearError,
        clearMessage,
    };
};
