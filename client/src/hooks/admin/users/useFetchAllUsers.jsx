import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsersAsync } from "../../../stores/actions/userAction";

export default function useFetchAllUsers() {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.users);

    const fetchAllUsers = async () => {
        await dispatch(fetchAllUsersAsync()).unwrap();
    };
    return { users, loading, error, fetchAllUsers };
};

