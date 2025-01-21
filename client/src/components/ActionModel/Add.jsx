import React from "react";
import useCreateUser from "../../hooks/admin/users/useCreateUser";
import MessageComponent from "./MessageComponent";

export default function Add({ userType, refe }) {
    const userTypeTitle = userType || "User";
    const {
        register,
        handleSubmit,
        onSubmit,
        loading,
        message,
        error,
        imagePreview,
        errors,
    } = useCreateUser(userType);

    return (
        <div className="row">
            <div className="col-md-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h6 className="card-title">Add {userTypeTitle}</h6>
                        <form
                            className="forms-sample"
                            onSubmit={handleSubmit(onSubmit)}
                            encType="multipart/form-data"
                        >
                            <div className="row">
                                {/* First Name */}
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>First Name:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            {...register("firstName", { required: "First name is required" })}
                                            disabled={loading}
                                        />
                                        {errors.firstName && (
                                            <p className="text-danger">{errors.firstName.message}</p>
                                        )}
                                    </div>
                                </div>
                                {/* Last Name */}
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Last Name:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            {...register("lastName", { required: "Last name is required" })}
                                            disabled={loading}
                                        />
                                        {errors.lastName && (
                                            <p className="text-danger">{errors.lastName.message}</p>
                                        )}
                                    </div>
                                </div>
                                {/* Email */}
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Email:</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            {...register("email", { required: "Email is required" })}
                                            disabled={loading}
                                        />
                                        {errors.email && (
                                            <p className="text-danger">{errors.email.message}</p>
                                        )}
                                    </div>
                                </div>
                                {/* Mobile */}
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Mobile:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            {...register("mobile", { required: "Mobile number is required" })}
                                            disabled={loading}
                                        />
                                        {errors.mobile && (
                                            <p className="text-danger">{errors.mobile.message}</p>
                                        )}
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
                                            disabled={loading}
                                        />
                                        {errors.password && (
                                            <p className="text-danger">{errors.password.message}</p>
                                        )}
                                    </div>
                                </div>
                                {/* File Upload */}
                                {/* <div className="col-sm-6">
                                    <div className="flex items-center g-7">
                                        <label>Upload File:</label>
                                        <div className="custom-file ">
                                            <input
                                                type="file"
                                                className="w-5"
                                                {...register("img")}
                                                accept="image/*"
                                                disabled={loading}
                                            />
                                            <label className="custom-file-label">
                                                {imagePreview ? "Change File" : "Choose File"}
                                            </label>
                                        </div>
                                        {imagePreview && (
                                            <div className="mt-3">
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    className="img-thumbnail"
                                                    style={{ maxHeight: "100px", maxWidth: "100px" }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div> */}
                                {/* Conditional Reference Field */}
                                {(userType === "Distributer" ||
                                    userType === "Retailer" ||
                                    userType === "User") && (
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Reference:</label>
                                                <select
                                                    className="form-control"
                                                    {...register("refId", { required: "Reference is required" })}
                                                    disabled={loading}
                                                >
                                                    <option value="">Select Reference</option>
                                                    {refe.map((ref, index) => (
                                                        <option key={index} value={ref.refId}>
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
                                {/* Status */}
                                <div className="col-sm-6 pt-9 ">
                                    <div className="form-group">
                                        <div className="flex text-center items-center gap-[30px]">
                                            <label>Status:</label>
                                            <div className="flex g-1">
                                                <input
                                                    type="radio"
                                                    className="form-check-input"
                                                    {...register("userStatus", { required: "Status is required" })}
                                                    value="true"
                                                    defaultChecked
                                                    disabled={loading}
                                                />
                                                <label className="form-check-label">Active</label>
                                            </div>
                                            <div className="flex g-1">
                                                <input
                                                    type="radio"
                                                    className="form-check-input"
                                                    {...register("userStatus")}
                                                    value="false"
                                                    disabled={loading}
                                                />
                                                <label className="form-check-label">Deactive</label>
                                            </div>
                                        </div>
                                        {errors.userStatus && (
                                            <p className="text-danger">{errors.userStatus.message}</p>
                                        )}
                                    </div>
                                </div>
                                {/* Buttons */}
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
                        <MessageComponent />
                    </div>
                </div>
            </div>
        </div>
    );
}
