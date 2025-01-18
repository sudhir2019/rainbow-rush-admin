import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createUserAsync } from "../../../stores/actions/userAction";
import { clearMessage, clearError } from "../../../stores/slices/userSlice";
import userFetchAllUsers from "../users/useFetchAllUsers";
const useCreateUser = (userType = "User") => {
    const userRole = userType ? userType.replace(/\s+/g, '').toLowerCase() : "user";
    const dispatch = useDispatch();
    const { loading, message, error } = useSelector((state) => state.users);

    // Initialize useForm with validation rules
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            mobile: "",
            password: "",
            roles: userRole,
            userStatus: "true",  // Default to active
            img: null,
        },
    });

    const imagePreview = watch("img") ? URL.createObjectURL(watch("img")[0]) : null;

    // Submit handler
    const onSubmit = async (data) => {
        try {
            await dispatch(
                createUserAsync({ ...data, role: userType })
            ).unwrap();
            alert("User created successfully!");
            reset(); // Reset form fields
            const { users } = userFetchAllUsers();
        } catch (err) {
            console.error("Error creating user:", err);
        } finally {
            clearMessages();
        }
    };

    // Clear success and error messages
    const clearMessages = () => {
        dispatch(clearMessage());
        dispatch(clearError());
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        setValue,
        reset,
        loading,
        message,
        error,
        errors,
        imagePreview,
    };
};

export default useCreateUser;
