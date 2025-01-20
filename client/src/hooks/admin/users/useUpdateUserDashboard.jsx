import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { updateUserDashboardAsync } from '../../../stores/actions/userAction'; // Adjust path as necessary

const useUpdateUserDashboard = (id) => {
    const dispatch = useDispatch();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // Get loading, success message, and error from Redux store
    let { isLoading, message, error } = useSelector((state) => state.users); // Adjust path based on your store

    const [showMessage, setShowMessage] = useState(false);

    const onSubmit = async (userData) => {
        try {
            // Dispatching the updateUserDashboardAsync action with data and ID
            await dispatch(updateUserDashboardAsync({ userData, id })).unwrap(); // Use unwrap to access the resolved value or error
            // Handle success (maybe show a success message or redirect)
        } catch (error) {
            console.error("Error updating user dashboard:", error);
            // Handle specific errors as needed
        }
    };

    // Automatically hide success/error messages after 3 seconds
    useEffect(() => {
        if (message || error) {
            setShowMessage(true);
            const timer = setTimeout(() => {
                message = null;
                error = null;
                setShowMessage(false);
            }, 3000); // 3000ms = 3 seconds

            return () => clearTimeout(timer); // Clear timeout on component unmount
        }
    }, [message, error]);

    return {
        register,
        handleSubmit,
        onSubmit,
        isLoading,
        message: showMessage ? message : null, // Only show message when showMessage is true
        error: showMessage ? error : null, // Only show error when showMessage is true
        errors,
    };
};

export default useUpdateUserDashboard;
