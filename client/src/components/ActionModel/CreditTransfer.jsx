import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useCreditTransfer from "../../hooks/admin/wallets/useCreditTransfer"; // Adjust path as necessary
import useFetchWalletById from "../../hooks/admin/wallets/useFetchWalletById";
import MessageComponent from "./MessageComponent";
import { ScaleLoader } from "react-spinners"
export default function CreditTransfer({ userType }) {
    const { users, loading, error } = useSelector((state) => state.users);
    const [user, setUser] = useState({});
    const { any } = useParams();
    const { wallet } = useFetchWalletById(any);
    const {
        register,
        handleSubmit,
        onSubmit,
        isLoading,
        error: formError,
        errors,
    } = useCreditTransfer(any);

    useEffect(() => {
        if (users?.length > 0) {
            const foundUser = users.find((u) => u._id === any);
            if (foundUser) { setUser(foundUser) };
        }
    }, [any, users]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="row">
            <div className="col-md-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-header">
                        <h6>Credit Transfer</h6>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group d-flex">
                                <div className="col-sm-3 offset-lg-3">
                                    <h4 className="breadcrumb bg-light">User: {user.username}</h4>
                                    <br />
                                    <h4 className="breadcrumb bg-light">
                                        Individual Credit: {(wallet?.individualCredit || 0).toFixed(2)}
                                    </h4>
                                    <br />
                                    <h4 className="breadcrumb bg-light">
                                        Hierarchy Credit: {(wallet?.hierarchyCredit || 0).toFixed(2)}
                                    </h4>
                                </div>
                                <div className="col-sm-3"></div>
                            </div>
                            <div className="form-group d-flex">
                                <label className="col-sm-2 offset-lg-1 text-right control-label mt-2">
                                    Amount to Transfer
                                </label>
                                <div className="col-sm-6">
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="transferAmount"
                                        {...register("transferAmount", { required: "Amount is required" })}
                                    />
                                    {errors.transferAmount && (
                                        <span className="text-danger">{errors.transferAmount.message}</span>
                                    )}
                                </div>
                            </div>
                            <div className="form-group d-flex">
                                <label className="col-sm-2 offset-lg-1 text-right control-label mt-2">
                                    Password
                                </label>
                                <div className="col-sm-6">
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        {...register("password", { required: "Password is required" })}
                                    />
                                    {errors.password && (
                                        <span className="text-danger">{errors.password.message}</span>
                                    )}
                                </div>
                            </div>
                            <div className="form-group d-flex">
                                <label className="col-sm-2 offset-lg-1 text-right control-label mt-2"></label>
                                <div className="col-sm-6" style={{ display: "flex", gap: "10px" }}>
                                    <button type="submit" className="btn btn-primary" disabled={isLoading}>
                                        {isLoading ? "Processing..." : "Credit Transfer"}
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
            {isLoading && (
                <div className="modal-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <ScaleLoader />
                </div>
            )
            }
        </div>
    );
}
