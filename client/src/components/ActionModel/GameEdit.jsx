import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useUpdateGame } from "../../hooks/admin/games/useUpdateGame"; // Adjust the path

export default function GameEdit() {
    const { any } = useParams();
    const { games, gamesLoading } = useSelector((state) => state.games);
    // Find the game by ID
    const initialGameData = games.find((g) => g._id === any) || {};

    // Use the hook for managing form and submission
    const { register, handleSubmit, onSubmit, errors, gamesError, gamesMessage } = useUpdateGame(initialGameData);

    if (!initialGameData._id) return <p>No game found with the provided ID.</p>;

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
                                        <input type="text" className="form-control" value={initialGameData.gameId || ""} readOnly />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Game Name:</label>
                                        <input type="text" className="form-control" {...register("gameName", { required: "Game Name is required" })} />
                                        {errors.gameName && <p className="text-danger">{errors.gameName.message}</p>}
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Number of Digits:</label>
                                        <input type="number" className="form-control" {...register("nodigit", { required: "Number of Digits is required" })} />
                                        {errors.nodigit && <p className="text-danger">{errors.nodigit.message}</p>}
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Logo URL:</label>
                                        <input type="text" className="form-control" {...register("logo")} />
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label>Description:</label>
                                        <textarea className="form-control" rows="3" {...register("description", { required: "Description is required" })}></textarea>
                                        {errors.description && <p className="text-danger">{errors.description.message}</p>}
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Publisher:</label>
                                        <input type="text" className="form-control" {...register("publisher", { required: "Publisher is required" })} />
                                        {errors.publisher && <p className="text-danger">{errors.publisher.message}</p>}
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Release Date:</label>
                                        <input type="date" className="form-control" {...register("releaseDate", { required: "Release Date is required" })} />
                                        {errors.releaseDate && <p className="text-danger">{errors.releaseDate.message}</p>}
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Status:</label>
                                        <select className="form-control" {...register("status", { required: "Status is required" })}>
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                        {errors.status && <p className="text-danger">{errors.status.message}</p>}
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-sm-6">
                                    <button type="submit" className="btn btn-primary mr-2" disabled={gamesLoading}>
                                        {gamesLoading ? "Updating..." : "Submit"}
                                    </button>
                                    <button type="button" onClick={() => window.history.back()} className="btn btn-light">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </form>
                        {gamesError && <p className="text-danger">{gamesError}</p>}
                        {gamesMessage && <p className="text-success">{gamesMessage}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
