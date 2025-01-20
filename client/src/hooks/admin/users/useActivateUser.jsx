import { useDispatch, useSelector } from 'react-redux';
import { useState, useCallback } from 'react';
import { activateUserAsync } from '../../../stores/actions/userAction'; // Adjust the path as needed

export default function useActivateUser() {
    const dispatch = useDispatch();

    // Local state to manage loading and errors
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    // Redux state for global handling (optional)
    const { user, status } = useSelector((state) => state.users);
    // Callback function to activate the user
    const activateUser = useCallback(
        async (userId, action) => {
            console.log(`Activating user ${userId} with action ${action}`);
            setIsLoading(true);
            setError(null);
            setSuccessMessage(null);

            try {
                const response = await dispatch(activateUserAsync({ userId, action })).unwrap();
                setSuccessMessage(`User ${userId} has been successfully ${action}d.`);
                return response;
            } catch (err) {
                console.error('Error in activation:', err);
                setError(err.message || 'Failed to update user status.');
            } finally {
                setIsLoading(false);
            }
        },
        [dispatch]
    );

    return {
        activateUser,
        isLoading,
        error,
        successMessage,
        user,
        status,
    };
}
