import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ScaleLoader } from "react-spinners";
import { useFetchCompanies } from "../../hooks/admin/companies/useFetchCompanies"; 
import CompaniesAdd from "../../components/ActionModel/CompaniesAdd";
import Modal from "../../components/ActionModel/Modal";
import CompaniesEdit from "../../components/ActionModel/CompaniesEdit";
import useActivateCompanies from "../../hooks/admin/companies/useActivateCompanies";
import { useDeleteCompanies } from "../../hooks/admin/companies/useDeleteCompanies";

const Company = () => {
    const { action, any } = useParams();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [modalTitle, setModalTitle] = useState("");
    const [onConfirmAction, setOnConfirmAction] = useState(null);
    const { companies } = useSelector((state) => state.companies);
    const { companiesLoading, fetchAllCompanies } = useFetchCompanies(); 
    const { removeCompanies } = useDeleteCompanies();
    const { activateCompany } = useActivateCompanies();

    // Fetch companies only once when the component mounts
    useEffect(() => {
        if (action === undefined || action === null) {
            fetchAllCompanies();
        }

    }, [action]); // Dependency on action to re-trigger when action changes
    

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
            await activateCompany(companyId, action);
        } catch (error) {
            console.error(`Failed to ${action} company:`, error);
        } finally {
            closeModal();
        }
    };

    const handleDelete = async (companyId) => {
        try {
            await removeCompanies(companyId);
            fetchAllCompanies();
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
        return <CompaniesAdd action={"create"} any={any} />;
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
                                            company ? (
                                                <tr key={company._id}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{company.name}</td>
                                                    <td>{company.uniqueId}</td>
                                                    <td>{company.games.map(game => game.gameName).join(", ")}</td>
                                                    <td>{new Date(company.createdAt).toLocaleString()}</td>
                                                    <td>
                                                        <div className="btn-group">
                                                            <Link to={`edit/${company._id}`} className="btn btn-outline-info">
                                                                <i className="fas fa-edit"></i>
                                                            </Link>
                                                            {company.status === "active" ? (
                                                                <Link
                                                                    to="#"
                                                                    className="btn btn-outline-secondary"
                                                                    onClick={() =>
                                                                        openModal(
                                                                            `Are you sure you want to deactivate ${company.name}?`,
                                                                            'Deactivate Confirmation',
                                                                            () => handleActivateDeactivate(company._id, true)
                                                                        )
                                                                    }
                                                                >
                                                                    <i className="fa fa-toggle-off"></i>
                                                                </Link>
                                                            ) : (
                                                                <Link
                                                                    to="#"
                                                                    className="btn btn-outline-primary"
                                                                    onClick={() =>
                                                                        openModal(
                                                                            `Are you sure you want to activate ${company.name}?`,
                                                                            'Activate Confirmation',
                                                                            () => handleActivateDeactivate(company._id, false)
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
                                                                        `Are you sure you want to delete ${company.name}?`,
                                                                        'Delete Confirmation',
                                                                        () => handleDelete(company._id)
                                                                    )
                                                                }
                                                            >
                                                                <i className="fas fa-trash"></i>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ) : null
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
