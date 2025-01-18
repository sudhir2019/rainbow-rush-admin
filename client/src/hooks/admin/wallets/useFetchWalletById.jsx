import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWalletsById } from '../../../stores/actions/walletAction'; // Adjust import path as needed

const useFetchWalletById = (userId) => {
    const dispatch = useDispatch();

    // Getting state from Redux store
    const { wallet, iswalletLoading, walletError, walletMessage } = useSelector((state) => state.wallets);

    // Fetch wallet data when the component mounts or when userId changes
    useEffect(() => {
        if (userId) {
            dispatch(fetchWalletsById(userId));
        }
    }, [dispatch, userId]);

    return {
        wallet,
        iswalletLoading,
        walletError,
        walletMessage
    };
};

export default useFetchWalletById;
