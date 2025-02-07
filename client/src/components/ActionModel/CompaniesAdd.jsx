import { useNavigate } from 'react-router-dom';
import { useCompanyActions } from '../../hooks/admin/companies/useCreateCompany'; // Import your custom hook


export default function CompaniesAdd() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        errors,
        games,
        isLoading,
        companiesLoading,
        companiesMessage,
        companiesError
    } = useCompanyActions();;


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
                                        <label>Games:</label>
                                        <select className="form-control" {...register("games")} multiple>
                                            {isLoading ? (
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

                            {/* Submit and Cancel Buttons */}
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary mr-2" disabled={companiesLoading}>
                                            {companiesLoading ? "Submitting..." : "Submit"}
                                        </button>
                                        <button type="button" onClick={() => navigate("/admin/company")} className="btn btn-light">
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
        </div>
    );
}
