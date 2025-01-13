import { useDispatch, useSelector } from "react-redux";
import { deleteUserAsync } from "../../../stores/actions/userAction";

const useDeleteUser = () => {
    const dispatch = useDispatch();
    const { users, loading, error, message } = useSelector((state) => state.users);

    const deleteUser = async (userId) => {
        await dispatch(deleteUserAsync(userId));
    };

    return { deleteUser, users, loading, error, message };
};

export default useDeleteUser;
