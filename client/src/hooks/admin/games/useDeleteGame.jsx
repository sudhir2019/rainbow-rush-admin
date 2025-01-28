import { useDispatch, useSelector } from "react-redux";
import { deleteGame } from "../../../stores/actions/gameActions";
import { setGameDeleted } from "../../../stores/slices/gameSlice";

// Hook for deleting a game
export const useDeleteGame = () => {
    const dispatch = useDispatch();
    const { 
        gamesLoading, 
        gamesError, 
        gamesMessage, 
        gameDeleted 
    } = useSelector((state) => state.games);

    const removeGame = async (gameId) => {
        try {
            await dispatch(deleteGame(gameId)).unwrap();
            dispatch(setGameDeleted());
        } catch (error) {
            console.error("Failed to delete game:", error);
        }
    };

    const resetDeleteState = () => {
        dispatch(setGameDeleted(false));
    };

    return {
        gamesLoading,
        gamesError,
        gamesMessage,
        gameDeleted,
        removeGame,
        resetDeleteState,
    };
};
