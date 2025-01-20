import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Add from "../../components/ActionModel/Add";
import Edit from "../../components/ActionModel/Edit";
import CreditTransfer from "../../components/ActionModel/CreditTransfer";
import CreditAdjust from "../../components/ActionModel/CreditAdjust";
import Modal from "../../components/ActionModel/Modal";
import useActivateUser from '../../hooks/admin/users/useActivateUser';
import useDeleteUser from '../../hooks/admin/users/useDeleteUser';
export default function Distributor() {
    const { action, any } = useParams();
    const { distributers, superdistributers, loading, error } = useSelector((state) => state.users);
    const { wallets, isWalletLoading, walletwalletError, walletMessage } = useSelector((state) => state.wallets);
    const { activateUser, isLoading } = useActivateUser();
    const { deleteUser, users, message } = useDeleteUser();
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
        return <Edit userType={"Distributer"} userDetails={any} />;
    }
    if (action === "credittransfer") {
        return <CreditTransfer userType={"Distributer"} userDetails={any} />;
    }
    if (action === "creditadjust") {
        return <CreditAdjust userType={"Distributer"} userDetails={any} />;
    }

    if (action === "create") {
        return <Add userType={"Distributer"} refe={superdistributers} />;
    }

    if (action === undefined || action === null) {
        return (

            <div className="row relative">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between mb-2">
                            <b>Distributer</b>
                            <Link to={`create/distributer`} className="btn btn-primary btn-md">
                                Add Distributer
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
                                    <tbody>
                                        {distributers.map((distributer, index) => {
                                            const hasDistributersRole = distributer.roles.some(
                                                (role) => role.name === "distributer"
                                            );
                                            if (hasDistributersRole) {
                                                return (
                                                    <tr key={index}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{distributer.username}</td>
                                                        <td>{distributer.refId}</td>
                                                        <td>{distributer.username}</td>
                                                        {distributer.wallet.map((point, walletIndex) => {
                                                            const matchingWallet = wallets.find((wallet) => wallet._id === point._id); // Find the matching wallet
                                                            if (matchingWallet) {
                                                                return (
                                                                    <td className="p-2" key={`${walletIndex}-${matchingWallet._id}`}>
                                                                        {matchingWallet.individualCredit}
                                                                    </td>
                                                                );
                                                            }
                                                            return 0.0//return null if no matching wallet is found
                                                        })}

                                                        <td>{new Date(distributer.createdAt).toLocaleString()}</td>
                                                        <td>
                                                            <div className="btn-group">
                                                                <Link to={`edit/${distributer._id}`}
                                                                    type="button"
                                                                    className="btn btn-outline-info" >
                                                                    <i className="fas fa-edit"></i>
                                                                </Link>
                                                                <Link to={`credittransfer/${distributer._id}`}
                                                                    type="button"
                                                                    className="btn btn-outline-success"  >
                                                                    <i className="fas fa-arrow-up"></i>
                                                                </Link>

                                                                <Link to={`creditadjust/${distributer._id}`}
                                                                    type="button"
                                                                    className="btn btn-outline-warning"
                                                                >
                                                                    <i className="fas fa-arrow-down"></i>
                                                                </Link>
                                                                {/* <Link
                                                                    to=""
                                                                    className="btn btn-outline-success"
                                                                    onClick={handleCancel}
                                                                >
                                                                    <i className="fa fa-times-circle"></i>
                                                                </Link> */}
                                                                {/* Activate Link */}

                                                                {distributer.userStatus ? (
                                                                    // Render Deactivate Link if userStatus is true (active)
                                                                    <Link
                                                                        to="#"
                                                                        className="btn btn-outline-secondary"
                                                                        onClick={() =>
                                                                            openModal(
                                                                                `Are you sure you want to deactivate ${distributer.name}?`,
                                                                                'Deactivate Confirmation',
                                                                                () => handleActivateDeactivate(distributer._id, true)
                                                                            )
                                                                        }
                                                                    >
                                                                        <i className="fa fa-times-circle"></i>
                                                                    </Link>
                                                                ) : (
                                                                    // Render Activate Link if userStatus is false (inactive)
                                                                    <Link
                                                                        to="#"
                                                                        className="btn btn-outline-primary"
                                                                        onClick={() =>
                                                                            openModal(
                                                                                `Are you sure you want to activate ${distributer.name}?`,
                                                                                'Activate Confirmation',
                                                                                () => handleActivateDeactivate(distributer._id, false)
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
                                                                            `Are you sure you want to  Delete ${distributer.name}?`,
                                                                            'Delete Confirmation',
                                                                            () => handleDelete(distributer._id)
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
            </div>
        );
    }
};
