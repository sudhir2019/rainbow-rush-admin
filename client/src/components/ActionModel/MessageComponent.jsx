import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, clearError } from "../../stores/slices/userSlice";
import { clearwalletMessage, clearwalletError } from "../../stores/slices/walletSlice";
const MessageComponent = () => {
    const dispatch = useDispatch();
    const { message, error } = useSelector((state) => state.users);
    const { walletError, walletMessage } = useSelector((state) => state.wallets);
    useEffect(() => {
        if (message || error) {
            const timeout = setTimeout(() => {
                dispatch(clearMessage());
                dispatch(clearError());
            }, 3000);
            return () => clearTimeout(timeout); // Cleanup timeout
        }
    }, [message, error, walletError, walletMessage, dispatch]);

    useEffect(() => {
        if (walletMessage || walletError) {
            const timeout = setTimeout(() => {
                dispatch(clearwalletMessage());
                dispatch(clearwalletError());
            }, 3000);
            return () => clearTimeout(timeout); // Cleanup timeout
        }
    }, [walletError, walletMessage, dispatch]);
    return (
        <div className="p-1">
            {message && <p className="text-success">{message}</p>}
            {error && <p className="text-danger">{error}</p>}
            {walletMessage && <p className="text-success">{walletMessage}</p>}
            {walletError && <p className="text-danger">{walletError}</p>}
        </div>
    );
};

export default MessageComponent;
