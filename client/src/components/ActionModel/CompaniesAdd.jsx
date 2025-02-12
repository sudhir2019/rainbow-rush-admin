import { useCompanyActions } from '../../hooks/admin/companies/useCreateCompany'; // Import your custom hook
import { ScaleLoader } from "react-spinners"

export default function CompaniesAdd() {
    const {
        register,
        handleSubmit,
        errors,
        games,
        isLoading,
        companiesLoading,
        companiesMessage,
        companiesError
    } = useCompanyActions();

    return (
        <div className="row">
            <div className="col-md-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h6 className="card-title">Add Company</h6>
                        <form className="forms-sample" onSubmit={handleSubmit}>
                            <div className="row">
                                {/* Company Name */}
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Company Name:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            {...register("name", { required: "Company Name is required" })}
                                        />
                                        {errors.name && <small className="text-danger">{errors.name.message}</small>}
                                    </div>
                                </div>

                                {/* Username */}
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Username:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            {...register("username", { required: "Username is required" })}
                                        />
                                        {errors.username && <small className="text-danger">{errors.username.message}</small>}
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Password:</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            {...register("password", { required: "Password is required" })}
                                        />
                                        {errors.password && <small className="text-danger">{errors.password.message}</small>}
                                    </div>
                                </div>

                                {/* Commission Amount */}
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Commission Amount:</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            {...register("commissionAmount", { required: "Commission Amount is required" })}
                                        />
                                        {errors.commissionAmount && <small className="text-danger">{errors.commissionAmount.message}</small>}
                                    </div>
                                </div>

                                {/* Note */}
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Note:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            {...register("note")}
                                        />
                                    </div>
                                </div>

                                {/* Referrer ID */}
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Referrer ID:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            {...register("refId")}
                                            readOnly
                                        />
                                    </div>
                                </div>

                                {/* Status */}
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Status:</label>
                                        <div className="form-check form-check-inline">
                                            <input
                                                type="radio"
                                                className="form-check-input"
                                                value="true"
                                                {...register("status")}
                                                defaultChecked
                                            />
                                            <label className="form-check-label">Active</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                type="radio"
                                                className="form-check-input"
                                                value="false"
                                                {...register("status")}
                                            />
                                            <label className="form-check-label">Deactive</label>
                                        </div>
                                    </div>
                                </div>

                                {/* Select Games */}
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label className="block text-lg font-semibold text-gray-700 mb-3">Select Games:</label>
                                        {isLoading ? (
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
                                                            id={`game-${game._id}`}
                                                            value={game._id}
                                                            {...register("games")}
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

                            {/* Submit and Cancel Buttons */}
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary mr-2" disabled={companiesLoading}>
                                            {companiesLoading ? "Submitting..." : "Submit"}
                                        </button>
                                        <button type="button" onClick={() => window.history.back()} className="btn btn-light">
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        {companiesMessage && <p className="text-success">{companiesMessage}</p>}
                        {companiesError && <p className="text-danger">{companiesError}</p>}
                    </div>
                </div>
            </div>
            {isLoading && (
                <div className="modal-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <ScaleLoader />
                </div>
            )}
        </div>
    );
}
