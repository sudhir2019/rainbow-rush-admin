import { useDispatch } from "react-redux";
import { logoutAsync } from "../../stores/actions/authActions";
import { useNavigate } from "react-router-dom";
const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async (id) => {
        console.log("clicked");
        try {
            // Trigger the API logout and state reset
            await dispatch(logoutAsync(id)).unwrap();
            // navigate to login page after logout
            navigate("/auth/login");

        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return handleLogout;
};

export default useLogout;
