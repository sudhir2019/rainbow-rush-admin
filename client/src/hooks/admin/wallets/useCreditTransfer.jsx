import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
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
    const { authUser } = useSelector((state) => state.auth); // Assuming user is stored in auth state
    const { wallet, isWalletLoading, walletError, walletMessage } = useSelector((state) => state.wallets);

    // Submission handler
    const onSubmit = async (data) => {
        try {
            const requestData = {
                userId: authUser._id,
                password: data.password,
                transferAmount: parseFloat(data.transferAmount),
                toUserId: id,
            };
            console.log(requestData);
            await dispatch(creditTransferAsync(requestData)).unwrap(); // Dispatch action and handle response
            reset(); // Reset the form on success
        } catch (err) {
            console.error("Error during credit transfer:", err);
        }
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        wallet,
        isWalletLoading,
        walletMessage, // Conditionally show success message
        walletError, // Conditionally show error message
        errors,
    };
}
