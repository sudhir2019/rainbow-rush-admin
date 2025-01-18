import { useDispatch, useSelector } from "react-redux";
import { fetchWalletsAsync } from "../../../stores/actions/walletAction";
import { useEffect } from 'react';
export default function useFetchAllWallets() {
    const dispatch = useDispatch();
    const { wallets, isWalletLoading, walletwalletError, walletMessage } = useSelector((state) => state.wallets);

    const fetchAllWallets = async () => {
        await dispatch(fetchWalletsAsync()).unwrap();
    };
    // Fetch session data on mount
    useEffect(() => {
        dispatch(fetchWalletsAsync());
    }, []);
    return { wallets, isWalletLoading, walletwalletError, walletMessage, fetchAllWallets };
};

