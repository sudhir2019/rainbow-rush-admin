import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
// import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';  // For DataTables with Bootstrap 4 styling

// import $ from 'jquery';  // Import jQuery
// import 'datatables.net'; // Core DataTables functionality
// import 'datatables.net-bs4'; // Bootstrap 4 integration
// import 'datatables.net-buttons-bs4'; // DataTables Buttons plugin (with Bootstrap 4 integration)


const SuperDistributor = () => {
    const { action } = useParams();
    // const [message, setMessage] = useState('');
    // useEffect(() => {
    //     if (action === undefined) {
    //       // Initialize DataTable once the component is mounted
    //       $('#example').DataTable({
    //         dom: 'lfrtip', // Removed 'B' for Buttons
    //         pageLength: 10,  // Default number of entries to show
    //         lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]], // Options for showing entries
    //       });
    //     }
    //   }, [action]);
    if (action === "create") {


        return (
            <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-title">Add Super Distributor</h6>
                            <form className="forms-sample" method="post" action="../superDistributer">
                                <input
                                    type="hidden"
                                    name="_token"
                                    value="YSgMhxcTwDkTktHlDonU3bhbsdde42lvR5fkjxpZ"
                                />
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>User Name :</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="user_name"
                                                value=""
                                                autoComplete="off"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Password :</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="password"
                                                value=""
                                                autoComplete="off"
                                            />
                                        </div>
                                    </div>
                                    <input
                                        type="hidden"
                                        className="form-control"
                                        name="refferal_id"
                                        value="62174b0b9360000054002472"
                                        autoComplete="off"
                                    />
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Commission :</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="commission"
                                                value=""
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
                                                value=""
                                                autoComplete="off"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label
                                                htmlFor="exampleInputPassword2"
                                                className="col-sm-3 col-form-label pl-0"
                                            >
                                                Status :
                                            </label>
                                            <div className="form-check form-check-inline">
                                                <label className="form-check-label">
                                                    <input
                                                        type="radio"
                                                        className="form-check-input"
                                                        name="status"
                                                        value="true"
                                                        defaultChecked
                                                    />
                                                    Active
                                                    <i className="input-frame"></i>
                                                </label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <label className="form-check-label">
                                                    <input
                                                        type="radio"
                                                        className="form-check-input"
                                                        name="status"
                                                        value="false"
                                                    />
                                                    Deactive
                                                    <i className="input-frame"></i>
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
                                            >
                                                Submit
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
    }
    if (action === "edit") {
        return (
            <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-title">Edit Super Distributer</h6>

                            <input type="hidden" name="_token" value="gJwJcfUVeHAr4WU6by93Ym2EI0gtHeKaXM5muUqR" />
                            <input type="hidden" name="_method" value="PUT" />
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>User Name :</label>
                                        <input type="text" className="form-control" name="user_name" readonly="" value="bkpatil" autocomplete="off" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Password :</label>
                                        <input type="text" className="form-control" name="password" value="123456" autocomplete="off" />
                                    </div>
                                </div>
                                <input type="hidden" className="form-control" name="refferal_id" value="62174b0b9360000054002472" autocomplete="off" />
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Commission :</label>
                                        <input type="text" className="form-control" name="commission" value="10" autocomplete="off" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Note :</label>
                                        <input type="text" className="form-control" name="note" value="" autocomplete="off" />
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

                        </div>
                    </div>
                </div>
            </div>
        );
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


                            <input type="hidden" name="_token" value="mSiRWcrtPaqPmLnSxuogDJQLYqhCLNfEnkxHJM6K" />
                            <div className="form-group d-flex">
                                <div className="col-sm-3 offset-lg-3">
                                    <h4 className="breadcrumb bg-light">User: bkpatil</h4><br />
                                    <h4 className="breadcrumb bg-light">Individual Credit : 0.00</h4><br />
                                    <h4 className="breadcrumb bg-light">Hierarchy Credit: 0.00</h4>
                                </div>
                                <div className="col-sm-3">
                                </div>
                            </div>
                            <div className="form-group d-flex">
                                <label className="col-sm-2 offset-lg-1 text-right control-label mt-2">Amount to Transfer</label>
                                <div className="col-sm-6">
                                    <input type="number" className="form-control ui-autocomplete-input " id="exampleInputUsername1" value="" name="amount" autoComplete="off" />
                                    <input type="hidden" value="66d84c94df109e0af4057bf4" name="id" autoComplete="off" />
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
                                <div className="col-sm-6" style={{display:"flex",gap:"10px"}}>
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

                        </div>
                    </div>
                </div>
            </div>
        )
    }
    if(action === "adjustcredit"){
        return(
            <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
            <div className="card">
                <div className="card-header">
                    <h6>Credit Adjust</h6>
                </div>
                <div className="card-body">
                    
                    <form method="post" action="../../superDistributer/66d84c94df109e0af4057bf4/adjustcredit">
                        <input type="hidden" name="_token" value="mSiRWcrtPaqPmLnSxuogDJQLYqhCLNfEnkxHJM6K" />                        <div className="form-group d-flex">
                            <div className="col-sm-3 offset-lg-3">
                                <h4 className="breadcrumb bg-light">User: bkpatil</h4><br />
                                <h4 className="breadcrumb bg-light">Credits: 0.00</h4><br />
                                                            <h4 className="breadcrumb bg-light">Hierarchy Credit: 0.00</h4>
                            </div>
                                                    </div>
                        <div className="form-group d-flex">
                            <label className="col-sm-2 offset-lg-1 text-right control-label mt-2">Amount to Transfer</label>
                            <div className="col-sm-6">
                                <input type="number" className="form-control ui-autocomplete-input " id="exampleInputUsername1" value="" name="amount" autoComplete="off" />
                                    <input type="hidden" value="66d84c94df109e0af4057bf4" name="id" autoComplete="off" />
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
                            <div className="col-sm-6" style={{display:"flex",gap:"10px"}}>
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
    if (action === undefined) {
        return (
            <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between mb-2">
                            <b>Super Distributer</b>
                            <Link to="create" className="btn btn-primary btn-md">Add Super Distributer</Link>
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
                                            <th>Points</th>
                                            <th>Date & time</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>super-1 <a href="superDistributer/66d84c94df109e0af4057bf4.html"><i className='far fa-eye'></i></a></td>
                                            <td>admin</td>
                                            <td>super_000000011</td>
                                            <td>0</td>
                                            <td>2024-09-04 05:33:32 PM</td>
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

                                                    <a href="superDistributer/66d84c94df109e0af4057bf4/banuser"
                                                        className="btn btn-outline-success"
                                                    >
                                                        <i className="fa fa-times-circle"></i>
                                                    </a>

                                                    <a href="superDistributer/66d84c94df109e0af4057bf4/delete"

                                                        className="btn btn-outline-danger delete-confirm"
                                                    >
                                                        <i className="fas fa-trash"></i>
                                                    </a>
                                                </div>

                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>super-2 <a href="superDistributer/66d84c94df109e0af4057bf4.html"><i className='far fa-eye'></i></a></td>
                                            <td>admin</td>
                                            <td>super_000000011</td>
                                            <td>0</td>
                                            <td>2024-09-04 05:33:32 PM</td>
                                            <td>
                                                <div className="btn-group">
                                                    <a href="superDistributer/66d84c94df109e0af4057bf4/edit.html"
                                                        type="button"
                                                        className="btn btn-outline-info" >
                                                        <i className="fas fa-edit"></i>
                                                    </a>

                                                    <a href="superDistributer/66d84c94df109e0af4057bf4/transfercredit"
                                                        className="btn btn-outline-success"  >
                                                        <i className="fas fa-arrow-up"></i>
                                                    </a>

                                                    <a href="superDistributer/66d84c94df109e0af4057bf4/adjustcredit"
                                                        className="btn btn-outline-warning"
                                                    >
                                                        <i className="fas fa-arrow-down"></i>
                                                    </a>

                                                    <a href="superDistributer/66d84c94df109e0af4057bf4/banuser"
                                                        className="btn btn-outline-success"
                                                    >
                                                        <i className="fa fa-times-circle"></i>
                                                    </a>

                                                    <a href="superDistributer/66d84c94df109e0af4057bf4/delete"

                                                        className="btn btn-outline-danger delete-confirm"
                                                    >
                                                        <i className="fas fa-trash"></i>
                                                    </a>
                                                </div>

                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>super-3 <a href="superDistributer/66d84c94df109e0af4057bf4.html"><i className='far fa-eye'></i></a></td>
                                            <td>admin</td>
                                            <td>super_000000011</td>
                                            <td>0</td>
                                            <td>2024-09-04 05:33:32 PM</td>
                                            <td>
                                                <div className="btn-group">
                                                    <a href="superDistributer/66d84c94df109e0af4057bf4/edit.html"
                                                        type="button"
                                                        className="btn btn-outline-info" >
                                                        <i className="fas fa-edit"></i>
                                                    </a>

                                                    <a href="superDistributer/66d84c94df109e0af4057bf4/transfercredit"
                                                        className="btn btn-outline-success"  >
                                                        <i className="fas fa-arrow-up"></i>
                                                    </a>

                                                    <a href="superDistributer/66d84c94df109e0af4057bf4/adjustcredit"
                                                        className="btn btn-outline-warning"
                                                    >
                                                        <i className="fas fa-arrow-down"></i>
                                                    </a>

                                                    <a href="superDistributer/66d84c94df109e0af4057bf4/banuser"
                                                        className="btn btn-outline-success"
                                                    >
                                                        <i className="fa fa-times-circle"></i>
                                                    </a>

                                                    <a href="superDistributer/66d84c94df109e0af4057bf4/delete"

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
        );
    }



};

export default SuperDistributor;
