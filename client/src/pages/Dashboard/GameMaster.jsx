import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ScaleLoader } from "react-spinners"
import GameAdd from "../../components/ActionModel/GameAdd";
import Edit from "../../components/ActionModel/Edit";
import Modal from "../../components/ActionModel/Modal";
import {useDeleteGame} from '../../hooks/admin/games/useDeleteGame';
import { useFetchGames } from '../../hooks/admin/games/useFetchGames';
import useActivateGame from "../../hooks/admin/games/useActivateGame";
import GameEdit from "../../components/ActionModel/GameEdit";

export default function GameMaster() {
    const { action, any } = useParams();
    // const { games, isLoading } = useSelector((state) => state.games);
    const { games, isLoading, fetchAllGames }=useFetchGames();
    useEffect(() => {
        fetchAllGames();
    }, []);
    const { removeGame } = useDeleteGame();
      const { activateGame } = useActivateGame();
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

    const handleDelete = async (gameId) => {
        try {
            await removeGame(gameId);
        } catch (error) {
            console.error(`Failed to delete game:`, error);
        } finally {
            closeModal();
        }
    };

 
    const handleActivateDeactivate = async (userId, isActive) => {
        const action = isActive ? "deactivate" : "activate";
        try {
            await activateGame(userId, action);
        } catch (error) {
            console.error(`Failed to ${action} user:`, error);
        } finally {
            closeModal();
        }
    };


    if (action === "edit") {
        return <GameEdit  />;
    }

    if (action === "create") {
        return <GameAdd userType={"Game Master"} />;
    }


    if (action === undefined || action === null) {
        return (
            <div className="row relative">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between mb-2">
                            <b>Game Master</b>
                            <Link to={`create`} className="btn btn-primary btn-md">
                                Add Game
                            </Link>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-bordered data-table" id="example">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Game ID</th>
                                            <th>Game Name</th>
                                            <th>No. of Digits</th>
                                            <th>Status</th>
                                            <th>Publisher</th>
                                            <th>Release Date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {games.map((game, index) => (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{game.gameId}</td>
                                                <td>{game.gameName}</td>
                                                <td>{game.nodigit}</td>
                                                <td>
                                                    <span className={`badge ${
                                                        game.status === 'active' ? 'bg-success' :
                                                        game.status === 'inactive' ? 'bg-danger' :
                                                        game.status === 'coming-soon' ? 'bg-warning' : 'bg-secondary'
                                                    }`}>
                                                        {game.status}
                                                    </span>
                                                </td>
                                                <td>{game.publisher}</td>
                                                <td>{new Date(game.releaseDate).toLocaleDateString()}</td>
                                                <td>
                                                    <div className="btn-group">
                                                    <Link to={`edit/${game._id}`}
                                                                    type="button"
                                                                    className="btn btn-outline-info" >
                                                                    <i className="fas fa-edit"></i>
                                                                </Link>
                                                                {game.status === "active" ? (
                                                                    <Link
                                                                        to="#"
                                                                        className="btn btn-outline-secondary"
                                                                        onClick={() =>
                                                                            openModal(
                                                                                `Are you sure you want to deactivate ${game.gameName}?`,
                                                                                'Deactivate Confirmation',
                                                                                () => handleActivateDeactivate(game._id, true)
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
                                                                                `Are you sure you want to activate ${game.gameName}?`,
                                                                                'Activate Confirmation',
                                                                                () => handleActivateDeactivate(game._id, false)
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
                                                                            `Are you sure you want to  Delete ${game.gameName}?`,
                                                                            'Delete Confirmation',
                                                                            () => handleDelete(game._id)
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
                    onConfirm={onConfirmAction}
                >
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
}