import { useState } from "react";
import { ScaleLoader } from "react-spinners"
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Add from "../../components/ActionModel/Add";
import Edit from "../../components/ActionModel/Edit";
import CreditTransfer from "../../components/ActionModel/CreditTransfer";
import CreditAdjust from "../../components/ActionModel/CreditAdjust";
import Modal from "../../components/ActionModel/Modal";
import useActivateUser from '../../hooks/admin/users/useActivateUser';
import useDeleteUser from '../../hooks/admin/users/useDeleteUser';

const SuperDistributor = () => {
    const { action, any } = useParams();
    const { superdistributers, admins, isLoading } = useSelector((state) => state.users);
    const { wallets, isWalletLoading } = useSelector((state) => state.wallets);
    const { activateUser } = useActivateUser();
    const { deleteUser } = useDeleteUser();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [modalTitle, setModalTitle] = useState("");
    const [onConfirmAction, setOnConfirmAction] = useState(null);
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

    const handleActivateDeactivate = async (userId, isActive) => {
        const action = isActive ? "deactivate" : "activate";
        try {
            await activateUser(userId, action);
        } catch (error) {
            console.error(`Failed to ${action} user:`, error);
        } finally {
            closeModal();
        }
    };


    const handleDelete = async (userId) => {
        try {
            await deleteUser(userId);
        } catch (error) {
            console.error(`Failed to ${userId} user:`, error);
        } finally {
            closeModal();
        }
    };

    if (action === "edit") {
        return <Edit userType={"Superdistributer"} userDetails={any} refe={admins} />;
    }
    if (action === "credittransfer") {
        return <CreditTransfer userType={"Superdistributer"} userDetails={any} />;
    }
    if (action === "creditadjust") {
        return <CreditAdjust userType={"Superdistributer"} userDetails={any} />;
    }

    if (action === "create") {
        return <Add userType={"Superdistributer"} refe={admins} />;
    }

    if (action === undefined || action === null) {
        return (
            <div className="row relative">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between mb-2">
                            <b>Super Distributor</b>
                            <Link to={`create`} className="btn btn-primary btn-md">
                                Add Super Distributor
                            </Link>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-bordered data-table" id="example">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>UserName</th>
                                            <th>Refer ID</th>
                                            <th>Unique Id</th>
                                            <th>Points</th>
                                            <th>Date & Time</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="overflow-y h-9">
                                        {superdistributers.map((superDistributer, index) => {
                                            const hasSuperDistributerRole = superDistributer.roles.some(
                                                (role) => role.name === "superdistributer"
                                            );
                                            if (hasSuperDistributerRole) {
                                                return (
                                                    <tr key={index}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{superDistributer.username}</td>
                                                        <td>{superDistributer.refId}</td>
                                                        <td>{superDistributer.username}</td>
                                                        {isWalletLoading ? (

                                                            <td colSpan="100%">

                                                                {/* <div className="flex items-center justify-center space-x-2"> */}
                                                                <svg className="w-6 h-6 text-blue-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0"></path>
                                                                </svg>

                                                                {/* </div> */}
                                                            </td>

                                                        ) : (
                                                            superDistributer.wallet.map((point, walletIndex) => {
                                                                const matchingWallet = wallets?.find((wallet) => wallet._id === point._id) || false; // Find the matching wallet
                                                                if (matchingWallet) {
                                                                    return (
                                                                        <td className="p-2" key={`${walletIndex}-${matchingWallet._id}`}>
                                                                            {matchingWallet.individualCredit}
                                                                        </td>
                                                                    );
                                                                }
                                                                return (
                                                                    <td className="p-2" key={`${walletIndex}-empty`}>
                                                                        0.0
                                                                    </td>
                                                                );
                                                            })
                                                        )}



                                                        <td>{new Date(superDistributer.createdAt).toLocaleString()}</td>
                                                        <td>
                                                            <div className="btn-group">
                                                                <Link to={`edit/${superDistributer._id}`}
                                                                    type="button"
                                                                    className="btn btn-outline-info" >
                                                                    <i className="fas fa-edit"></i>
                                                                </Link>
                                                                <Link to={`credittransfer/${superDistributer._id}`}
                                                                    type="button"
                                                                    className="btn btn-outline-success"  >
                                                                    <i className="fas fa-arrow-up"></i>
                                                                </Link>

                                                                <Link to={`creditadjust/${superDistributer._id}`}
                                                                    type="button"
                                                                    className="btn btn-outline-warning"
                                                                >
                                                                    <i className="fas fa-arrow-down"></i>
                                                                </Link>
                                                                {superDistributer.userStatus ? (
                                                                    // Render Deactivate Link if userStatus is true (active)
                                                                    <Link
                                                                        to="#"
                                                                        className="btn btn-outline-secondary"
                                                                        onClick={() =>
                                                                            openModal(
                                                                                `Are you sure you want to deactivate ${superDistributer.username}?`,
                                                                                'Deactivate Confirmation',
                                                                                () => handleActivateDeactivate(superDistributer._id, true)
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
                                                                                `Are you sure you want to activate ${superDistributer.username}?`,
                                                                                'Activate Confirmation',
                                                                                () => handleActivateDeactivate(superDistributer._id, false)
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
                                                                            `Are you sure you want to  Delete ${superDistributer.username}?`,
                                                                            'Delete Confirmation',
                                                                            () => handleDelete(superDistributer._id)
                                                                        )
                                                                    }
                                                                >
                                                                    <i className="fas fa-trash"></i>
                                                                </Link>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                            return null;
                                        })}
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
                {isLoading && (
                    <div className="modal-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <ScaleLoader />
                    </div>
                )}
            </div>
        );
    }
};

export default SuperDistributor;
