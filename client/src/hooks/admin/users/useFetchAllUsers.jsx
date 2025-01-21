import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsersAsync } from "../../../stores/actions/userAction";
import { useEffect } from 'react';
export default function useFetchAllUsers(role) {
    const dispatch = useDispatch();
    const { users, isLoading, error } = useSelector((state) => state.users);

    const fetchAllUsers = async () => {
        await dispatch(fetchAllUsersAsync()).unwrap();
    };
    // Fetch session data on mount
    useEffect(() => {
        dispatch(fetchAllUsersAsync(role));
    }, []);
    return { users, isLoading, error, fetchAllUsers };
};

