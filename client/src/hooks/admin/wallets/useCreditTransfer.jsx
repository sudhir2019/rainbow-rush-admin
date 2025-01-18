import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { creditTransferAsync } from "../../../stores/actions/walletAction";

export default function useCreditTransfer(id) {
    const dispatch = useDispatch();

    // Setting up react-hook-form
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // Fetch states from Redux
    const { user } = useSelector((state) => state.auth); // Assuming user is stored in auth state
    const { wallet, isWalletLoading, walletError, walletMessage } = useSelector((state) => state.wallets);
    const [showMessage, setShowMessage] = useState(false);

    // Submission handler
    const onSubmit = async (data) => {
        try {
            const requestData = {
                userId: user._id,
                password: data.password,
                transferAmount: parseFloat(data.transferAmount),
                toUserId: id,
            };
            await dispatch(creditTransferAsync(requestData)).unwrap(); // Dispatch action and handle response
            reset(); // Reset the form on success
        } catch (err) {
            console.error("Error during credit transfer:", err);
        }
    };

    // Automatically hide messages after 3 seconds
    useEffect(() => {
        if (walletMessage || walletError) {
            setShowMessage(true);
            const timer = setTimeout(() => {
                setShowMessage(false);
            }, 3000); // 3 seconds
            return () => clearTimeout(timer); // Cleanup on unmount
        }
    }, [walletMessage, walletError]);

    return {
        register,
        handleSubmit,
        onSubmit,
        wallet,
        isWalletLoading,
        walletMessage: showMessage ? walletMessage : null, // Conditionally show success message
        walletError: showMessage ? walletError : null, // Conditionally show error message
        errors,
    };
}
