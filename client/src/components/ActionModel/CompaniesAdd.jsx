import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createCompany, updateCompany } from '../../stores/actions/companieAction';
import { useCompanyActions } from '../../hooks/admin/companies/useCompanyActions';

export default function CompaniesAdd() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const {
        companiesLoading: loading,
        addCompany,
        editCompany
    } = useCompanyActions();

    const [action] = useState(id ? "edit" : "create");
    const [formData, setFormData] = useState({
        name: '',
        note: '',
        status: 'true'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = action === "create"
            ? await addCompany(formData)
            : await editCompany(id, formData);

        if (success) {
            navigate(-1);
        }
    };

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
    )
}
