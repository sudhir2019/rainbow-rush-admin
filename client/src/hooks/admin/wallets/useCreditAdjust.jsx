import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { creditAdjustAsync } from "../../../stores/actions/walletAction";


/**
 * Custom hook for handling credit transfers.
 * @param {string} id - The ID of the recipient user.
 * @returns {Object} - Methods and state related to the credit transfer.
 */
export default function useCreditTransfer(id) {
    const dispatch = useDispatch();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // Fetch states from Redux
    const { authUser } = useSelector((state) => state.auth); // Assuming user is stored in auth state
    const { wallet, isWalletLoading, walletError, walletMessage } = useSelector((state) => state.wallets);

    const [showMessage, setShowMessage] = useState(false);

    /**
     * Handles form submission and dispatches the credit transfer action.
     * @param {Object} data - The form data.
     */
    const onSubmit = async (data) => {
        const requestData = {
            userId: authUser._id,
            password: data.password,
            adjustAmount: parseFloat(data.transferAmount),
            transactionType: data.transactionType || "credit",
            toUserId: id,
        };

        try {
            await dispatch(creditAdjustAsync(requestData)).unwrap();
            reset(); // Reset the form on success
        } catch (err) {
            console.error("Error during credit transfer:", err.message || err);
        }
    };

    // Automatically hide messages after 3 seconds
    useEffect(() => {
        if (walletMessage || walletError) {
            setShowMessage(true);
            const timer = setTimeout(() => setShowMessage(false), 3000);
            return () => clearTimeout(timer); // Cleanup on unmount
        }
    }, [walletMessage, walletError]);

    return {
        register,
        handleSubmit,
        onSubmit,
        wallet,
        isWalletLoading,
        walletMessage: showMessage ? walletMessage : null,
        walletError: showMessage ? walletError : null,
        errors,
    };
}
