import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
// import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';  // For DataTables with Bootstrap 4 styling

// import $ from 'jquery';  // Import jQuery
// import 'datatables.net'; // Core DataTables functionality
// import 'datatables.net-bs4'; // Bootstrap 4 integration
// import 'datatables.net-buttons-bs4'; // DataTables Buttons plugin (with Bootstrap 4 integration)


const Company = () => {
    const { action } = useParams();
    console.log(action)
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
                                <table className="table table-bordered data-table" id="example">
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
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>super-1 <a href="superDistributer/66d84c94df109e0af4057bf4.html"><i className='far fa-eye'></i></a></td>

                                            <td>super_000000011</td>
                                            <td>Games1,2,3</td>
                                            <td>2024-09-04 05:33:32 PM</td>
                                            <td>
                                                <div className="btn-group">
                                                    <Link to="edit"
                                                        type="button"
                                                        className="btn btn-outline-info" >
                                                        <i className="fas fa-edit"></i>
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

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    if (action === "create") {


        return (
            <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-title">Add Company</h6>
                            <form className="forms-sample" method="post" action="#">
                                <input
                                    type="hidden"
                                    name="_token"
                                    value="YSgMhxcTwDkTktHlDonU3bhbsdde42lvR5fkjxpZ"
                                />
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Company Name :</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="user_name"
                                                value=""
                                                autoComplete="off"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-6"></div>

                                    <div className="col-sm-3">
                                        <div className="form-group">
                                            <label>List Of Games :</label>
                                            <div className="checkbox">
                                                <label>
                                                    <input type="checkbox" /> Game 1
                                                </label>
                                            </div>
                                            <div className="checkbox">
                                                <label>
                                                    <input type="checkbox" /> Game 2
                                                </label>
                                            </div>
                                            <div className="checkbox">
                                                <label>
                                                    <input type="checkbox" /> Game 3
                                                </label>
                                            </div>
                                            <div className="checkbox">
                                                <label>
                                                    <input type="checkbox" /> Game 4
                                                </label>
                                            </div>
                                            <div className="checkbox">
                                                <label>
                                                    <input type="checkbox" /> Game 5
                                                </label>
                                            </div>
                                            <div className="checkbox">
                                                <label>
                                                    <input type="checkbox" /> Game 6
                                                </label>
                                            </div>
                                            <div className="checkbox">
                                                <label>
                                                    <input type="checkbox" /> Game 7
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-6"></div>
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
                            <h6 className="card-title">Edit Company</h6>

                            <input type="hidden" name="_token" value="gJwJcfUVeHAr4WU6by93Ym2EI0gtHeKaXM5muUqR" />
                            <input type="hidden" name="_method" value="PUT" />
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Company Name :</label>
                                        <input type="text" className="form-control" name="user_name" readOnly="" value="bkpatil" autoComplete="off" />
                                    </div>
                                </div>
                                <div className="col-sm-6"></div>
                                <div className="col-sm-3">
                                    <div className="form-group">
                                        <label>List Of Games :</label>
                                        <div className="checkbox">
                                            <label>
                                                <input type="checkbox" /> Game 1
                                            </label>
                                        </div>
                                        <div className="checkbox">
                                            <label>
                                                <input type="checkbox" /> Game 2
                                            </label>
                                        </div>
                                        <div className="checkbox">
                                            <label>
                                                <input type="checkbox" /> Game 3
                                            </label>
                                        </div>
                                        <div className="checkbox">
                                            <label>
                                                <input type="checkbox" /> Game 4
                                            </label>
                                        </div>
                                        <div className="checkbox">
                                            <label>
                                                <input type="checkbox" /> Game 5
                                            </label>
                                        </div>
                                        <div className="checkbox">
                                            <label>
                                                <input type="checkbox" /> Game 6
                                            </label>
                                        </div>
                                        <div className="checkbox">
                                            <label>
                                                <input type="checkbox" /> Game 7
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6"></div>

                            </div>
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword2" className="col-sm-3 col-form-label pl-0">Status :</label>
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





};

export default Company;
