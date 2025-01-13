import { useDispatch } from "react-redux";
import { clearMessage, clearError } from "../../../stores/slices/userSlice";

const useUserHelpers = () => {
    const dispatch = useDispatch();

    const clearErrorMessage = () => dispatch(clearError());
    const clearSuccessMessage = () => dispatch(clearMessage());

    return { clearErrorMessage, clearSuccessMessage };
};

export default useUserHelpers;
