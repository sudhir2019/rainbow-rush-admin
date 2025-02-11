// pages/CompaniesEdit.js
import React from "react";
import { useCompaniesUpdate } from "../../hooks/admin/companies/useCompaniesUpdate";
import MessageComponent from "./MessageComponent";
const CompaniesEdit = () => {
    const {
        register,
        handleSubmit,
        onSubmit,
        errors,
        navigate,
        company,
        companiesLoading,
        companiesError,
        games,
        gamesLoading,
    } = useCompaniesUpdate();

    if (!company) return <p>Loading company data...</p>;
    console.log(games)
    return (
        <div className="row">
            <div className="col-md-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h6 className="card-title">Edit Company</h6>
                        {companiesError && <div className="alert alert-danger">{companiesError}</div>}

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row">
                                {/* Company Name */}
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Company Name:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            {...register("name", { required: "Company name is required" })}
                                            readOnly
                                        />
                                    </div>
                                </div>

                                {/* Note */}
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Note:</label>
                                        <input type="text" className="form-control" {...register("note")} />
                                    </div>
                                </div>

                                {/* Status */}
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Status:</label>
                                        <select className="form-control" {...register("status", { required: true })}>
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Games Selection */}
                                {/* Select Games */}
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label className="block text-lg font-semibold text-gray-700 mb-3">Select Games:</label>
                                        {gamesLoading ? (
                                            <p className="text-gray-500">Loading games...</p>
                                        ) : (
                                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                                {games.map((game) => (
                                                    <div
                                                        key={game._id}
                                                        className="flex items-center"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            id={`${game._id}`}
                                                            value={game._id}
                                                            multiple
                                                            defaultValue={game._id}
                                                            {...register("games", { required: "Please select at least one game" })}
                                                            className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                                        />
                                                        <label
                                                            htmlFor={`game-${game._id}`}
                                                            className="text-gray-900 m-2 font-medium cursor-pointer"
                                                        >
                                                            {game.gameName}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {/* Submit Button */}
                            <div className="row">
                                <div className="col-sm-6">
                                    <button type="submit" className="btn btn-primary mr-2">
                                        {companiesLoading ? "Updating..." : "Submit"}
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
};

export default CompaniesEdit;
