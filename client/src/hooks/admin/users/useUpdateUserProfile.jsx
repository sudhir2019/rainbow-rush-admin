import { useDispatch, useSelector } from "react-redux";
import { updateUserProfileAsync } from "../../../stores/actions/userAction";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import profilePictures from "../../assets/images/profilePicture/profilePicture.webp";

export default function useUpdateUserProfile() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { isLoading, error, message } = useSelector((state) => state.users);

    // Extract and initialize default values for the form
    const [defaultsValues, setDefaultsValues] = useState(() => {
        const address = user?.address || "";
        const addressParts = address.split(",").map(part => part.trim());
        const streetParts = addressParts[0]?.split(" ") || [];
        const streetNumber = streetParts.pop();
        const street = streetParts.join(" ");
        return {
            profilePicture: user?.profilePicture || profilePictures,
            fullName: user?.name || "",
            profileState: user?.profileState || "",
            id: user?._id || "",
            firstName: user?.name?.split(" ")[0] || "",
            lastName: user?.name?.split(" ")[1] || "",
            email: user?.email || "",
            mobile: user?.mobile || "",
            street: street || "",
            streetNumber: streetNumber || "",
            area: addressParts[1] || "",
            city: addressParts[2] || "",
            state: addressParts[3] || "",
            pinCode: addressParts[4] || "",
        };
    });

    const { register, reset, handleSubmit, formState: { errors }, setValue } = useForm({
        mode: "onBlur",
        defaultValues: defaultsValues, // Set default values for the form
    });

    // Update default values if the user data changes
    useEffect(() => {
        if (user) {
            const address = user?.address || "";
            const addressParts = address.split(",").map(part => part.trim());
            const streetParts = addressParts[0]?.split(" ") || [];
            const streetNumber = streetParts.pop();
            const street = streetParts.join(" ");
            const updatedValues = {
                profilePicture: profilePictures,
                fullName: user?.name || "",
                profileState: user?.profileState || "",
                id: user?._id || "",
                firstName: user?.name?.split(" ")[0] || "",
                lastName: user?.name?.split(" ")[1] || "",
                email: user?.email || "",
                mobile: user?.mobile || "",
                street: street || "",
                streetNumber: streetNumber || "",
                area: addressParts[1] || "",
                city: addressParts[2] || "",
                state: addressParts[3] || "",
                pinCode: addressParts[4] || "",
            };
            setDefaultsValues(updatedValues);
            reset(updatedValues);
        }
    }, [user, reset]);

    const onSubmit = async (data, e) => {
        e.preventDefault();

        // Prepare data to send to the backend
        const userData = {
            userId: user._id,
            profilePicture: data.profilePicture,
            firstName: data.firstName?.toLowerCase(),
            lastName: data.lastName?.toLowerCase(),
            email: data.email,
            password: data.password || null,
            newPassword: data.newPassword || null,
            mobile: data.mobile,
            street: data.street?.toLowerCase(),
            houseNo: data.streetNumber,
            area: data.area?.toLowerCase(),
            city: data.city?.toLowerCase(),
            state: data.state?.toLowerCase(),
            pinCodeNumber: data.pinCode,
        };
        console.log(data)

        try {
            await dispatch(updateUserProfileAsync(userData)); // Dispatch action
            // reset(); // Optionally reset form on success
        } catch (err) {
            console.error("Error updating user profile:", err); // Log any errors
        }
    };

    return { register, isLoading, reset, handleSubmit, setValue, message, error, errors, onSubmit, defaultsValues };
}
