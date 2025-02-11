import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ScaleLoader } from "react-spinners"
import { useFetchCompanies } from "../../hooks/admin/companies/useFetchCompanies"; // Import the hook
import CompaniesAdd from "../../components/ActionModel/CompaniesAdd";
import Modal from "../../components/ActionModel/Modal";
import CompaniesEdit from "../../components/ActionModel/CompaniesEdit";
import useActivateCompanies from "../../hooks/admin/companies/useActivateCompanies";
import { useDeleteCompanies } from "../../hooks/admin/companies/useDeleteCompanies";
const Company = () => {
    const { action, any } = useParams();
    const [loadData, setLoadData] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [modalTitle, setModalTitle] = useState("");
    const [onConfirmAction, setOnConfirmAction] = useState(null);
    const { companies } = useSelector((state) => state.companies);
    const {
        companiesLoading,
        fetchAllCompanies,
    } = useFetchCompanies(); // Use the hook to fetch and manage companies
    const { removeCompanies } = useDeleteCompanies();
    const { activateCompany } = useActivateCompanies(); // Call the hook to activate/deactivate the game
    useEffect(() => {
        if (loadData) {
            fetchAllCompanies();
            setLoadData(false);
        }
    }, [loadData]);
    const openModal = (content, title, onConfirm) => {
        setModalContent(content);
        setModalTitle(title);
        setOnConfirmAction(() => onConfirm);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setOnConfirmAction(null);
    };

    const handleActivateDeactivate = async (companyId, isActive) => {
        const action = isActive ? "deactivate" : "activate";
        try {
            // Replace with company activation logic
            await activateCompany(companyId, action);
        } catch (error) {
            console.error(`Failed to ${action} company:`, error);
        } finally {
            closeModal();
        }
    };

    const handleDelete = async (companyId) => {
        try {
            // Replace with company deletion logic
            await removeCompanies(companyId);
        } catch (error) {
            console.error(`Failed to delete company:`, error);
        } finally {
            closeModal();
        }
    };

    if (action === "edit") {
        return <CompaniesEdit />;
    }

    if (action === "create") {
        return <CompaniesAdd action={"create"} any={any} />
    }

    if (action === undefined || action === null) {
        return (
            <div className="row relative">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between mb-2">
                            <b>Companies</b>
                            <Link to="create" className="btn btn-primary btn-md">Add Company</Link>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Name</th>
                                            <th>Unique Id</th>
                                            <th>Games</th>
                                            <th>Date & time</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {companies.map((company, index) => (
                                            <tr key={company?._id || "data Loding.."}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{company?.name || "data Loding.."}</td>
                                                <td>{company?.uniqueId || "data Loding.."}</td>
                                                <td>{company?.games.map(game => game.gameName).join(", ") || "data Loding.."}</td>
                                                <td>{new Date(company?.createdAt).toLocaleString() || "data Loding.."}</td>
                                                <td>
                                                    <div className="btn-group">
                                                        <Link to={`edit/${company?._id || "data Loding.."}`} className="btn btn-outline-info">
                                                            <i className="fas fa-edit"></i>
                                                        </Link>

                                                        {company?.status === "active" ? (
                                                            // Render Deactivate Link if userStatus is true (active)

                                                            <Link
                                                                to="#"
                                                                className="btn btn-outline-secondary"
                                                                onClick={() =>
                                                                    openModal(
                                                                        `Are you sure you want to deactivate ${company?.name || "data Loding.."}?`,
                                                                        'Deactivate Confirmation',
                                                                        () => handleActivateDeactivate(company?._id || "data Loding..", true)
                                                                    )
                                                                }
                                                            >
                                                                <i className="fa fa-toggle-off"></i>
                                                            </Link>
                                                        ) : (
                                                            // Render Activate Link if userStatus is false (inactive)
                                                            <Link
                                                                to="#"
                                                                className="btn btn-outline-primary"
                                                                onClick={() =>
                                                                    openModal(
                                                                        `Are you sure you want to activate ${company?.name || "data Loding.."}?`,
                                                                        'Activate Confirmation',
                                                                        () => handleActivateDeactivate(company?._id || "data Loding..", false)
                                                                    )
                                                                }
                                                            >
                                                                <i className="fas fa-toggle-on"></i>
                                                            </Link>
                                                        )}
                                                        <Link
                                                            to="#"
                                                            className="btn btn-outline-danger delete-confirm"
                                                            onClick={() =>
                                                                openModal(
                                                                    `Are you sure you want to  Delete ${company?.name || "data Loding.."}?`,
                                                                    'Delete Confirmation',
                                                                    () => handleDelete(company?._id || "data Loding..")
                                                                )
                                                            }
                                                        >
                                                            <i className="fas fa-trash"></i>
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    show={modalVisible}
                    onClose={closeModal}
                    title={modalTitle}
                    onConfirm={onConfirmAction}>
                    {modalContent}
                </Modal>
                {companiesLoading && (
                    <div className="modal-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <ScaleLoader />
                    </div>
                )}
            </div>
        );
    }
};

export default Company;
