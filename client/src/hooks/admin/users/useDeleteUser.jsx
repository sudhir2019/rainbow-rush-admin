import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { deleteUserAsync } from "../../../stores/actions/userAction";

const useDeleteUser = () => {
    const dispatch = useDispatch();

    // Selectors for user-related state
    const {
        users,
        loading: isLoading,
        error,
        message
    } = useSelector((state) => state.users);

    // Memoized deleteUser function
    const deleteUser = useCallback(
        async (userId) => {
            try {
                await dispatch(deleteUserAsync(userId)).unwrap(); // Ensure clean error handling
            } catch (err) {
                console.error("Error deleting user:", err);
            }
        },
        [dispatch]
    );

    return {
        deleteUser,
        users,
        isLoading,
        error,
        message,
    };
};

export default useDeleteUser;
