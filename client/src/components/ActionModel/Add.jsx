import React from "react";
import useCreateUser from "../../hooks/admin/users/useCreateUser";

export default function Add({ userType }) {
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
                            onSubmit={handleSubmit(onSubmit)} // Handle submit correctly
                            encType="multipart/form-data"
                        >
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>First Name :</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            {...register("firstName", { required: "First name is required" })}
                                            disabled={loading}
                                        />
                                        {errors.firstName && <p className="text-danger">{errors.firstName.message}</p>}
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Last Name :</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            {...register("lastName", { required: "Last name is required" })}
                                            disabled={loading}
                                        />
                                        {errors.lastName && <p className="text-danger">{errors.lastName.message}</p>}
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Email :</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            {...register("email", { required: "Email is required" })}
                                            disabled={loading}
                                        />
                                        {errors.email && <p className="text-danger">{errors.email.message}</p>}
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Mobile :</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            {...register("mobile", { required: "Mobile number is required" })}
                                            disabled={loading}
                                        />
                                        {errors.mobile && <p className="text-danger">{errors.mobile.message}</p>}
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Password :</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            {...register("password", { required: "Password is required" })}
                                            disabled={loading}
                                        />
                                        {errors.password && <p className="text-danger">{errors.password.message}</p>}
                                    </div>
                                </div>
                                <div className="col-sm-6 d-flex align-items-center">
                                    <div className="form-group">
                                        <label>Upload File :</label>
                                        <input
                                            type="file"
                                            className="form-control w-52"
                                            {...register("img")}
                                            accept="image/*"
                                            disabled={loading}
                                        />
                                    </div>
                                    {imagePreview && (
                                        <div className="ml-3">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="img-thumbnail"
                                                style={{ maxHeight: "100px", maxWidth: "100px" }}
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="row mb-2">
                                    <div className="col-sm-6 items-center">
                                        {/* <div className="form-group"> */}
                                            <label className="pr-5">Status :</label>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    type="radio"
                                                    className="form-check-input"
                                                    {...register("userStatus", { required: "Status is required" })}
                                                    value="true"
                                                    checked
                                                    disabled={loading}
                                                />
                                                <label className="form-check-label">Active</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    type="radio"
                                                    className="form-check-input"
                                                    {...register("userStatus")}
                                                    value="false"
                                                    disabled={loading}
                                                />
                                                <label className="form-check-label">Deactive</label>
                                            </div>
                                            {errors.userStatus && <p className="text-danger">{errors.userStatus.message}</p>}
                                        {/* </div> */}
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
                            </div>
                            {message && <p className="text-success">{message}</p>}
                            {error && <p className="text-danger">{error}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
