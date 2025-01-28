import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import MessageComponent from "./MessageComponent";

export default function GameEdit() {
    const { games, loading } = useSelector((state) => state.games);
    const { register, handleSubmit, setValue } = useForm();
    const [game, setGame] = useState({});
    const { id } = useParams();

    useEffect(() => {
        if (games?.length > 0) {
            const foundGame = games.find((g) => g._id === id);
            if (foundGame) {
                setGame(foundGame);
                Object.keys(foundGame).forEach((key) => {
                    if (setValue) setValue(key, foundGame[key]);
                });
            }
        }
    }, [id, games, setValue]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setGame((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const onSubmit = async (data) => {
        try {
            // TODO: Add game update logic here
            console.log('Submitting:', data);
        } catch (error) {
            console.error('Error updating game:', error);
        }
    };

    if (!game) return <p>No game found with the provided ID.</p>;

    return (
        <div className="row">
            <div className="col-md-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h6 className="card-title">Edit Game</h6>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Game ID:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={game.gameId || ""}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Game Name:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="gameName"
                                            {...register("gameName", { required: true })}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Number of Digits:</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="nodigit"
                                            {...register("nodigit", { required: true })}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Logo URL:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="logo"
                                            {...register("logo")}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label>Description:</label>
                                        <textarea
                                            className="form-control"
                                            name="description"
                                            rows="3"
                                            {...register("description", { required: true })}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Publisher:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="publisher"
                                            {...register("publisher", { required: true })}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Release Date:</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="releaseDate"
                                            {...register("releaseDate", { required: true })}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Status:</label>
                                        <select
                                            className="form-control"
                                            name="status"
                                            {...register("status", { required: true })}
                                            onChange={handleInputChange}
                                        >
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-sm-6">
                                    <button type="submit" className="btn btn-primary mr-2">
                                        {loading ? "Updating..." : "Submit"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => window.history.back()}
                                        className="btn btn-light"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </form>
                        <MessageComponent />
                    </div>
                </div>
            </div>
        </div>
    );
}