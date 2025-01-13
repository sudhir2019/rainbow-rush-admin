import { useDispatch, useSelector } from "react-redux";
import { fetchUserByIdAsync } from "../../../stores/actions/userAction";

const useFetchUserById = () => {
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.users);

    const fetchUserById = async (userId) => {
        await dispatch(fetchUserByIdAsync(userId)).unwrap();
    };

    return { user, loading, error, fetchUserById };
};

export default useFetchUserById;
