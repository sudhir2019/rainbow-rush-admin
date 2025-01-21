import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { getSessionAsync } from "../../stores/actions/authActions";
import { getCookie } from '../../utils/authUtils';

const useSession = () => {
    const dispatch = useDispatch();

    // Access session state from Redux
    const {
        isLoading,
        isLoggedIn,
        user,
        token,
        roles,
        isAdmin,
        isUser,
        isCustomer,
        isModerator,
        error,
    } = useSelector((state) => state.auth);

    // Fetch session data on mount
    useEffect(() => {
        const token = getCookie('session-token');
        dispatch(getSessionAsync(token));
    }, []);

    return {
        isLoading,
        isLoggedIn,
        user,
        token,
        roles,
        isAdmin,
        isUser,
        isCustomer,
        isModerator,
        error,
    };
};

export default useSession;