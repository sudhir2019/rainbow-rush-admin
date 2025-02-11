import { useDispatch, useSelector } from "react-redux";
import { fetchUsersByCompanieIdAsync } from "../../../stores/actions/userAction";
import { useEffect } from 'react';

export default function useFetchCompanieIdUsers() {
    const dispatch = useDispatch();
    const { users, isLoading, error } = useSelector((state) => state.users);
    const { selectedCompanyId } = useSelector((state) => state.companies);

    console.log("Selected Company ID:", selectedCompanyId);

    const fetchCompanieIdUsers = async () => {
        if (!selectedCompanyId) return; // Prevent API call if company ID is missing
        await dispatch(fetchUsersByCompanieIdAsync(selectedCompanyId)).unwrap();
    };

    useEffect(() => {
        if (selectedCompanyId) {  // Ensure selectedCompanyId is defined
            fetchCompanieIdUsers();
        }
    }, [selectedCompanyId]); // Re-run when selectedCompanyId changes

    return { users, isLoading, error, fetchCompanieIdUsers };
};
