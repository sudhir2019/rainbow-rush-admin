import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync } from "../../stores/actions/authActions";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function useLogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [Errors, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const { isLoading, serverError } = useSelector((state) => state.auth);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ mode: "onBlur" });

    const preparePayload = (data) => ({
        username: data.userName.trim(),
        password: data.userPassword,
    });

    const onSubmit = async (data) => {
        setError("");
        setSuccessMessage("");
        const payload = preparePayload(data);

        try {
            const response = await dispatch(loginAsync(payload)).unwrap();
            setSuccessMessage("Login successful!");
            reset();

            setTimeout(() => {
                const rolePathMap = {
                    superadmin: "/superadmin/dashboard",
                    admin: "/admin/dashboard",
                    superdistributer: "/superdistributer/dashboard",
                    distributer: "/distributer/dashboard",
                    retailer: "/retailer/dashboard",
                    user: "/",
                };

                // Ensure response.roles exists and is an array
                if (!response || !response.roles || !Array.isArray(response.roles)) {
                    console.error("Roles data is missing or invalid:", response?.roles);
                    navigate("/auth/login");
                    return;
                }

                // Debugging: Log roles received
                console.log("Received roles:", response.roles);

                // Find the first valid role that exists in rolePathMap
                const userRole = response.roles.find(role => {
                    if (!role || !role.name) return false; // Ensure role and name exist
                    const lowerCaseRole = role.name.toLowerCase();
                    return Object.prototype.hasOwnProperty.call(rolePathMap, lowerCaseRole);
                });

                console.log("User Role Found:", userRole);

                if (userRole) {
                    navigate(rolePathMap[userRole.name.toLowerCase()]);
                } else {
                    console.warn("No valid role found, navigating to login.");
                    navigate("/auth/login");
                }
            }, 1000);


        } catch (error) {
            setError(error.message || "An error occurred during login.");
        }
    };

    return { register, isLoading, handleSubmit, errors, Errors, onSubmit, serverError, successMessage };
}
