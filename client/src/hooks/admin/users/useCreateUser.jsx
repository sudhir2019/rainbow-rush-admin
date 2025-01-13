import { useDispatch, useSelector } from "react-redux";
import { createUserAsync } from "../../../stores/actions/userAction";
import { clearMessage, clearError } from "../../../stores/slices/userSlice";

const useCreateUser = () => {
    const dispatch = useDispatch();
    const { loading, message, error } = useSelector((state) => state.users);

    const createUser = async (userData) => {
        await dispatch(createUserAsync(userData)).unwrap();
    };

    const clearMessages = () => {
        dispatch(clearMessage());
        dispatch(clearError());
    };

    return { createUser, loading, message, error, clearMessages };
};

export default useCreateUser;
