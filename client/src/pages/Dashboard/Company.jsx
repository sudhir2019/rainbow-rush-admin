import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchCompanies,
    createCompany,
    updateCompanyById,
    deleteCompanyById
} from "../../stores/actions/companieAction";
import { getToken } from "../../utils/authUtils";

const Company = () => {
    const { action } = useParams();
    const dispatch = useDispatch();
    const { companies, loading, error, pagination } = useSelector((state) => state.companies);
    const token = getToken();

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        games: [],
        note: "",
        status: "true"
    });

    // Load companies on component mount
    useEffect(() => {
        if (action === undefined) {
            dispatch(fetchCompanies({ page: 1, limit: 10 }));
        }
    }, [dispatch, action]);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            const gameId = value;
            setFormData(prev => ({
                ...prev,
                games: checked
                    ? [...prev.games, gameId]
                    : prev.games.filter(id => id !== gameId)
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (action === "create") {
            const result = await dispatch(createCompany(formData, token));
            if (result.success) {
                window.history.back();
            }
        } else if (action === "edit") {
            const companyId = ""; // Get company ID from somewhere
            const result = await dispatch(updateCompanyById(companyId, formData, token));
            if (result.success) {
                window.history.back();
            }
        }
    };

    // Handle company deletion
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this company?")) {
            const result = await dispatch(deleteCompanyById(id, token));
            if (result.success) {
                dispatch(fetchCompanies({ page: 1, limit: 10 }));
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (action === undefined) {
        return (
            <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between mb-2">
                            <b>Companies</b>
                            <Link to="create" className="btn btn-primary btn-md">Add Company</Link>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Name</th>
                                            <th>Unique Id</th>
                                            <th>Games</th>
                                            <th>Date & time</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {companies.map((company, index) => (
                                            <tr key={company._id}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{company.name}</td>
                                                <td>{company.uniqueId}</td>
                                                <td>{company.games.map(game => game.name).join(", ")}</td>
                                                <td>{new Date(company.createdAt).toLocaleString()}</td>
                                                <td>
                                                    <div className="btn-group">
                                                        <Link to={`edit/${company._id}`}
                                                            className="btn btn-outline-info">
                                                            <i className="fas fa-edit"></i>
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(company._id)}
                                                            className="btn btn-outline-danger">
                                                            <i className="fas fa-trash"></i>
                                                        </button>
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
            </div>
        );
    }

    // Create/Edit Form
    return (
        <div className="row">
            <div className="col-md-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h6 className="card-title">{action === "create" ? "Add" : "Edit"} Company</h6>
                        <form className="forms-sample" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Company Name :</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            autoComplete="off"
                                        />
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Note :</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="note"
                                            value={formData.note}
                                            onChange={handleInputChange}
                                            autoComplete="off"
                                        />
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Status :</label>
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label">
                                                <input
                                                    type="radio"
                                                    className="form-check-input"
                                                    name="status"
                                                    value="true"
                                                    checked={formData.status === "true"}
                                                    onChange={handleInputChange}
                                                />
                                                Active
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <label className="form-check-label">
                                                <input
                                                    type="radio"
                                                    className="form-check-input"
                                                    name="status"
                                                    value="false"
                                                    checked={formData.status === "false"}
                                                    onChange={handleInputChange}
                                                />
                                                Deactive
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-6">
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Company;