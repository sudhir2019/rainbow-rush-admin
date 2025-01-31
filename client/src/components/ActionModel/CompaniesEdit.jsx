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
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label>Games:</label>
                                        <select className="form-control" {...register("games")} multiple>
                                            {gamesLoading ? (
                                                <option>Loading games...</option>
                                            ) : (
                                                games.map((game) => (
                                                    <option key={game._id} value={game._id}>
                                                        {game.gameName}
                                                    </option>
                                                ))
                                            )}
                                        </select>
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
                                        onClick={() => navigate("/companies")}
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
