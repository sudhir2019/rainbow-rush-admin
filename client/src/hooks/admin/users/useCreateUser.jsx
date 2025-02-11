import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createUserAsync } from "../../../stores/actions/userAction";

const useCreateUser = (userType = "User") => {
    const userRole = userType ? userType.replace(/\s+/g, '').toLowerCase() : "user";
    const dispatch = useDispatch();
    const { loading, message, error } = useSelector((state) => state.users);
    const { selectedCompanyId } = useSelector((state) => state.companies)
    const { authUser } = useSelector((state) => state.auth);
    console.log("Selected Company ID:", selectedCompanyId);
    // Initialize useForm with validation rules
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            companieId: selectedCompanyId,
            username: "",
            password: "",
            refId: authUser?.refId || "not Login",
            commissionAmount: 0,
            roles: userRole,
            note: "add notes",
            userStatus: "true",  // Default to active
        },
    });


    // Submit handler
    const onSubmit = async (data) => {
        try {
            await dispatch(
                createUserAsync({ ...data, role: userType })
            ).unwrap();
            reset(); // Reset form fields
        } catch (err) {
            console.error("Error creating user:", err);
        }
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
    };
};

export default useCreateUser;
