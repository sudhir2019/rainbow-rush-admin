import { useCreateGame } from "../../hooks/admin/games/useCreateGame";
import MessageComponent from "./MessageComponent";
import { ScaleLoader } from "react-spinners"
export default function GameAdd() {
    const {
        gamesLoading: loading,
        gamesMessage: message,
        gamesError: error,
        register,
        handleSubmit,
        errors,
        onSubmit
    } = useCreateGame();

    return (
        <div className="row">
            <div className="col-md-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h6 className="card-title">Add Game</h6>
                        <form
                            className="forms-sample"
                            onSubmit={handleSubmit(onSubmit)}
                            encType="multipart/form-data"
                        >
                            <div className="row">
                                {/* Game Name */}
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Game Name:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            {...register("gameName", { required: "Game name is required" })}
                                            disabled={loading}
                                        />
                                        {errors.gameName && (
                                            <p className="text-danger">{errors.gameName.message}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Number of Digits */}
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Number of Digits:</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            {...register("nodigit", {
                                                required: "Number of digits is required",
                                                min: { value: 1, message: "Must be at least 1" }
                                            })}
                                            disabled={loading}
                                        />
                                        {errors.nodigit && (
                                            <p className="text-danger">{errors.nodigit.message}</p>
                                        )}
                                    </div>
                                </div>
                                {/* Publisher */}
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Publisher:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            {...register("publisher", { required: "Publisher is required" })}
                                            disabled={loading}
                                        />
                                        {errors.publisher && (
                                            <p className="text-danger">{errors.publisher.message}</p>
                                        )}
                                    </div>
                                </div>



                                {/* Release Date */}
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Release Date:</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            {...register("releaseDate", { required: "Release date is required" })}
                                            disabled={loading}
                                        />
                                        {errors.releaseDate && (
                                            <p className="text-danger">{errors.releaseDate.message}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Status */}
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Status:</label>
                                        <select
                                            className="form-control"
                                            {...register("status")}
                                            disabled={loading}
                                        >
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    </div>
                                </div>
                                {/* Description */}
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label>Description:</label>
                                        <textarea
                                            className="form-control"
                                            rows="3"
                                            {...register("description", { required: "Description is required" })}
                                            disabled={loading}
                                        />
                                        {errors.description && (
                                            <p className="text-danger">{errors.description.message}</p>
                                        )}
                                    </div>
                                </div>
                                {/* Buttons */}
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <button
                                            type="submit"
                                            className="btn btn-primary mr-2"
                                            disabled={loading}
                                        >
                                            {loading ? "Submitting..." : "Submit"}
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
                            </div>
                        </form>
                        <MessageComponent message={message} error={error} />
                        <div className="p-1">
                            {message && <p className="text-success">{message}</p>}
                            {error && <p className="text-danger">{error}</p>}
                        </div>
                    </div>
                </div>
            </div>
            {loading && (
                <div className="modal-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <ScaleLoader />
                </div>
            )}
        </div>
    );
}
