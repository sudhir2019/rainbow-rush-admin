import { useDispatch, useSelector } from 'react-redux';
import { useState, useCallback } from 'react';
import { activateCompanyAsync } from '../../../stores/actions/companieAction'; // You'll need to create this action

export default function useActivateCompanies() {
    const dispatch = useDispatch();

    // Local state to manage loading and errors
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    // Redux state for global handling
    const { companies, status } = useSelector((state) => state.companies);

    // Callback function to activate/deactivate the game
    const activateCompany = useCallback(
        async (companieId, action) => {
            console.log(`${action} Company ${companieId}`);
            setLoading(true);
            setError(null);
            setSuccessMessage(null);

            try {
                const response = await dispatch(activateCompanyAsync({ companieId, action })).unwrap();
                setSuccessMessage(`Company ${companieId} has been successfully ${action}d.`);
                return response;
            } catch (err) {
                console.error('Error in Company activation:', err);
                setError(err.message || 'Failed to update Company status.');
            } finally {
                setLoading(false);
            }
        },
        [dispatch]
    );

    return {
        activateCompany,
        loading,
        error,
        successMessage,
        companies,
        status,
    };
}