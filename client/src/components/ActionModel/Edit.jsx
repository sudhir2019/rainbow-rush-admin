import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useUpdateUserDashboard from "../../hooks/admin/users/useUpdateUserDashboard";
import MessageComponent from "./MessageComponent";

export default function Edit({ userType, refe }) {
    const { users, loading, error } = useSelector((state) => state.users);
    const [user, setUser] = useState({});
    const { any } = useParams();

    const {
        isLoading,
        message,
        error: formError,
        errors,
        handleSubmit,
        register,
        onSubmit,
        setValue,
    } = useUpdateUserDashboard(any);

    useEffect(() => {
        if (users?.length > 0) {
            const foundUser = users.find((u) => u._id === any);
            if (foundUser) {
                setUser(foundUser);
                Object.keys(foundUser).forEach((key) => {
                    if (setValue) setValue(key, foundUser[key]);
                });
            }
        }
    }, [any, users, setValue]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: name === "userStatus" ? value === "true" : value,
        }));
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!user) return <p>No user found with the provided ID.</p>;

    return (
        <div className="row">
            <div className="col-md-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h6 className="card-title">Edit {userType || "User"}</h6>

                        {/* Success Message*/}
                        {/* {message && <div className="alert alert-success">{message}</div>} */}

                        {/* Error Message */}
                        {/* {formError && <div className="alert alert-danger">{formError}</div>} */}

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>User Name:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={user.name || ""}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Password:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="password"
                                            value={user.password || ""}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Commission:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="Commission"
                                            value={user.Commission || ""}
                                            {...register("Commission", { required: true })}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Note:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="note"
                                            value={user.note || ""}
                                            {...register("note", { required: true })}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="flex items-center ">
                                        <label>Status:</label>
                                        <div className="flex items-center ml-1">
                                            <label className="flex items-center justify-between">
                                                <input
                                                    type="radio"
                                                    name="userStatus"
                                                    value="true"
                                                    className="m-1"
                                                    checked={user.userStatus === true}
                                                    {...register("userStatus", { required: true })}
                                                    onChange={handleInputChange}
                                                />
                                                Active
                                            </label>
                                            <label className="flex items-center justify-between">
                                                <input
                                                    type="radio"
                                                    name="userStatus"
                                                    value="false"
                                                    className="m-1"
                                                    checked={user.userStatus === false}
                                                    {...register("userStatus", { required: true })}
                                                    onChange={handleInputChange}
                                                />
                                                Deactive
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Conditional Reference Field */}
                                {(userType === "Distributer" || userType === "Retailer" || userType === "User") && (
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Reference:</label>
                                            <select
                                                className="form-control"
                                                {...register("reference", { required: "Reference is required" })}
                                                disabled={loading}
                                            >
                                                <option value="">Select Reference</option>
                                                {refe.map((ref, index) => (
                                                    <option key={index} value={ref._id}>
                                                        {ref.username}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.reference && (
                                                <p className="text-danger">{errors.reference.message}</p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="row">
                                <div className="col-sm-6">
                                    <button type="submit" className="btn btn-primary mr-2">
                                        {isLoading ? "Updating..." : "Submit"}
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
