import { useDispatch, useSelector } from 'react-redux';
import { useState, useCallback } from 'react';
import { activateGameAsync } from '../../../stores/actions/gameActions'; // You'll need to create this action

export default function useActivateGame() {
    const dispatch = useDispatch();

    // Local state to manage loading and errors
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    // Redux state for global handling
    const { game, status } = useSelector((state) => state.games);

    // Callback function to activate/deactivate the game
    const activateGame = useCallback(
        async (gameId, action) => {
            console.log(`${action} game ${gameId}`);
            setLoading(true);
            setError(null);
            setSuccessMessage(null);

            try {
                const response = await dispatch(activateGameAsync({ gameId, action })).unwrap();
                setSuccessMessage(`Game ${gameId} has been successfully ${action}d.`);
                return response;
            } catch (err) {
                console.error('Error in game activation:', err);
                setError(err.message || 'Failed to update game status.');
            } finally {
                setLoading(false);
            }
        },
        [dispatch]
    );

    return {
        activateGame,
        loading,
        error,
        successMessage,
        game,
        status,
    };
}