import React from 'react'
import { Link, useParams } from 'react-router-dom'

export default function Users() {
    const { action } = useParams();
    if (action === undefined) {
        return (
            <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between mb-2">
                            <b>Users</b>
                            <a href="users/add.html" className="btn btn-primary btn-md">Add User</a>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-bordered data-table" id="example">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>UserName</th>
                                            <th>Refer Name</th>
                                            <th>Unique Id</th>
                                            <th>Point</th>
                                            <th>Is Online</th>
                                            <th>Last Login</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>1</th>
                                            <td>user-1 <a href="GameBet.html"><i className='far fa-eye'></i></a></td>
                                            <td>indiar</td>
                                            <td>user_0000000231</td>
                                            <td>145.00</td>
                                            <td><span className="badge text-white bg-success">Online</span></td>
                                            <td className="sorting_1">2024-09-29 05:41:47 PM</td>
                                            <td>
                                                <div className="btn-group">
                                                    <Link to="edit"
                                                        type="button"
                                                        className="btn btn-outline-info" >
                                                        <i className="fas fa-edit"></i>
                                                    </Link>

                                                    <Link to="transfercredit"
                                                           className="btn btn-outline-success"  >
                                                           <i className="fas fa-arrow-up"></i>
                                                       </Link>
   
                                                       <Link to="adjustcredit"
                                                           className="btn btn-outline-warning"
                                                       >
                                                           <i className="fas fa-arrow-down"></i>
                                                       </Link>

                                                    <a href=""
                                                        className="btn btn-outline-success"
                                                    >
                                                        <i className="fa fa-times-circle"></i>
                                                    </a>

                                                    <a href=""

                                                        className="btn btn-outline-danger delete-confirm"
                                                    >
                                                        <i className="fas fa-trash"></i>
                                                    </a>
                                                </div>

                                            </td>
                                        </tr>
                                        <tr>
                                            <th>2</th>
                                            <td>user-2 <a href="GameBet.html"><i className='far fa-eye'></i></a></td>
                                            <td>indiar</td>
                                            <td>user_0000000231</td>
                                            <td>145.00</td>
                                            <td><span className="badge text-white bg-danger">Offline</span></td>
                                            <td className="sorting_1">2024-09-29 05:41:47 PM</td>
                                            <td>
                                                <div className="btn-group">
                                                    <a href="users/66d2e9a646572ef3e10f73e2/edit.html"
                                                        type="button"
                                                        className="btn btn-outline-info" >
                                                        <i className="fas fa-edit"></i>
                                                    </a>

                                                    <Link href="transfercredit"
                                                        className="btn btn-outline-success"  >
                                                        <i className="fas fa-arrow-up"></i>
                                                    </Link>

                                                    <Link href="adjustcredit"
                                                        className="btn btn-outline-warning"
                                                    >
                                                        <i className="fas fa-arrow-down"></i>
                                                    </Link>

                                                    <a href=""
                                                        className="btn btn-outline-success"
                                                    >
                                                        <i className="fa fa-times-circle"></i>
                                                    </a>

                                                    <a href=""

                                                        className="btn btn-outline-danger delete-confirm"
                                                    >
                                                        <i className="fas fa-trash"></i>
                                                    </a>
                                                </div>

                                            </td>
                                        </tr>
                                        <tr>
                                            <th>3</th>
                                            <td>user-3 <a href="GameBet.html"><i className='far fa-eye'></i></a></td>
                                            <td>indiar</td>
                                            <td>user_0000000231</td>
                                            <td>145.00</td>
                                            <td><span className="badge text-white bg-success">Online</span></td>
                                            <td className="sorting_1">2024-09-29 05:41:47 PM</td>
                                            <td>
                                                <div className="btn-group">
                                                    <a href="users/66d2e9a646572ef3e10f73e2/edit.html"
                                                        type="button"
                                                        className="btn btn-outline-info" >
                                                        <i className="fas fa-edit"></i>
                                                    </a>

                                                    <Link href="transfercredit"
                                                        className="btn btn-outline-success"  >
                                                        <i className="fas fa-arrow-up"></i>
                                                    </Link>

                                                    <a href="adjustcredit"
                                                        className="btn btn-outline-warning"
                                                    >
                                                        <i className="fas fa-arrow-down"></i>
                                                    </a>

                                                    <a href=""
                                                        className="btn btn-outline-success"
                                                    >
                                                        <i className="fa fa-times-circle"></i>
                                                    </a>

                                                    <a href=""

                                                        className="btn btn-outline-danger delete-confirm"
                                                    >
                                                        <i className="fas fa-trash"></i>
                                                    </a>
                                                </div>

                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
    if (action === "edit") {
        return (
            <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-title">Edit User</h6>
                            <form className="forms-sample" method="post" action="../../Distributer/66c31869d962b47f8d03d083">
                                <input type="hidden" name="_token" value="mSiRWcrtPaqPmLnSxuogDJQLYqhCLNfEnkxHJM6K" />
                                <input type="hidden" name="_method" value="PUT" />
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>User Name :</label>
                                            <input type="text" className="form-control" name="user_name" readOnly="" value="india" autoComplete="off" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Password :</label>
                                            <input type="text" className="form-control" name="password" value="123123" autoComplete="off" />
                                        </div>
                                    </div>
                                    <input type="hidden" className="form-control" name="refferal_id" value="62174b0b9360000054002472" autoComplete="off" />
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Commission :</label>
                                            <input type="text" className="form-control" name="commission" value="0" autoComplete="off" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Note :</label>
                                            <input type="text" className="form-control" name="note" value="Savera Group" autoComplete="off" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Reference :</label>
                                            <select className="form-control" name="refferal_id" id="refferal_id">
                                                <option selected="" disabled="">Select Super Distributer</option>
                                                <option value="66585f1745c592e98605fd19">punesd</option>
                                                <option value="66585f3fb72918110f0cc338">Khandalasd</option>
                                                <option value="6696650876d23cf39002e218">snsinga001</option>
                                                <option value="66c22f32bce28d04e205b642" selected="">emirates</option>
                                                <option value="66d84c94df109e0af4057bf4">bkpatil</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label for="exampleInputPassword2" className="col-sm-3 col-form-label pl-0">Status :</label>
                                            <div className="form-check form-check-inline">
                                                <label className="form-check-label">
                                                    <input type="radio" className="form-check-input" name="status" value="true" checked="" />Active
                                                    <i className="input-frame"></i></label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <label className="form-check-label">
                                                    <input type="radio" className="form-check-input" name="status" value="false" />Deactive
                                                    <i className="input-frame"></i></label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary mr-2">Submit</button>
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

    if (action === "transfercredit") {
        return (
            <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-header">
                            <h6>Credit Transfer</h6>
                        </div>
                        <div className="card-body">

                            <form method="post" action="transfercredit" >
                                <input type="hidden" name="_token" value="mSiRWcrtPaqPmLnSxuogDJQLYqhCLNfEnkxHJM6K" />                        <div className="form-group d-flex">
                                    <div className="col-sm-3 offset-lg-3">
                                        <h4 className="breadcrumb bg-light">User: india</h4><br />
                                        <h4 className="breadcrumb bg-light">Credits: 217.00</h4><br />
                                        <h4 className="breadcrumb bg-light">Hierarchy Credit: 53,785.00</h4>
                                    </div>
                                </div>
                                <div className="form-group d-flex">
                                    <label className="col-sm-2 offset-lg-1 text-right control-label mt-2">Amount to Transfer</label>
                                    <div className="col-sm-6">
                                        <input type="number" className="form-control ui-autocomplete-input " id="exampleInputUsername1" value="" name="amount" autoComplete="off" />
                                        <input type="hidden" value="66c31869d962b47f8d03d083" name="id" autoComplete="off" />
                                    </div>
                                </div>
                                <div className="form-group d-flex">
                                    <label className="col-sm-2 offset-lg-1 text-right control-label mt-2">Password</label>
                                    <div className="col-sm-6">
                                        <input type="password" className="form-control ui-autocomplete-input " id="exampleInputUsername1" value="" name="password" autoComplete="off" />
                                    </div>
                                </div>
                                <div className="form-group d-flex">
                                    <label className="col-sm-2 offset-lg-1 text-right control-label mt-2"></label>
                                    <div className="col-sm-6" style={{ display: "flex", gap: "10px" }}>
                                        <button type="submit" className="btn btn-primary">Credit Transfer</button>
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
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    if (action === "adjustcredit") {
        return (
            <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-header">
                            <h6>Credit Adjust</h6>
                        </div>
                        <div className="card-body">

                            <form method="post" action="../../Distributer/66c31869d962b47f8d03d083/adjustcredit">
                                <input type="hidden" name="_token" value="mSiRWcrtPaqPmLnSxuogDJQLYqhCLNfEnkxHJM6K" />                        <div className="form-group d-flex">
                                    <div className="col-sm-3 offset-lg-3">
                                        <h4 className="breadcrumb bg-light">User: india</h4><br />
                                        <h4 className="breadcrumb bg-light">Credits: 217.00</h4><br />
                                        <h4 className="breadcrumb bg-light">Hierarchy Credit: 52,816.00</h4>
                                    </div>
                                </div>
                                <div className="form-group d-flex">
                                    <label className="col-sm-2 offset-lg-1 text-right control-label mt-2">Amount to Transfer</label>
                                    <div className="col-sm-6">
                                        <input type="number" className="form-control ui-autocomplete-input " id="exampleInputUsername1" value="" name="amount" autoComplete="off" />
                                        <input type="hidden" value="66c31869d962b47f8d03d083" name="id" autoComplete="off" />
                                    </div>
                                </div>
                                <div className="form-group d-flex">
                                    <label className="col-sm-2 offset-lg-1 text-right control-label mt-2">Password</label>
                                    <div className="col-sm-6">
                                        <input type="password" className="form-control ui-autocomplete-input " id="exampleInputUsername1" value="" name="password" autoComplete="off" />
                                    </div>
                                </div>
                                <div className="form-group d-flex">
                                    <label className="col-sm-2 offset-lg-1 text-right control-label mt-2"></label>
                                    <div className="col-sm-6" style={{ display: "flex", gap: "10px" }}>
                                        <button type="submit" className="btn btn-primary">Credit Transfer</button>
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
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
