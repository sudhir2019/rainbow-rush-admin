import { useDispatch, useSelector } from "react-redux";
import { deleteCompanyById } from "../../../stores/actions/companieAction";
import { setCompaniesDeleted } from "../../../stores/slices/companieSlice";
export function useDeleteCompanies() {
  const dispatch = useDispatch();
  const { companiesLoading, companiesError, companiesMessag, companieDeleted } = useSelector((state) => state.companies);
  const removeCompanies = async (companiesId) => {
    try {
      await dispatch(deleteCompanyById(companiesId)).unwrap();
      dispatch(setCompaniesDeleted());
    } catch (error) {
      console.error("Failed to delete companies:", error);
    }
  };

  const resetDeleteState = () => {
    dispatch(setCompaniesDeleted(false));
  };

  return {
    companiesLoading,
    companiesError,
    companiesMessag,
    companieDeleted,
    removeCompanies,
    resetDeleteState,
  };
};
