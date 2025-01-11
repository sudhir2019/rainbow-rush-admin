import React from 'react'

export default function Users() {
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
                                                <a href="users/66d2e9a646572ef3e10f73e2/edit.html"
                                                    type="button"
                                                    className="btn btn-outline-info" >
                                                    <i className="fas fa-edit"></i>
                                                </a>

                                                <a href="users/66d2e9a646572ef3e10f73e2/transfercredit"
                                                    className="btn btn-outline-success"  >
                                                    <i className="fas fa-arrow-up"></i>
                                                </a>

                                                <a href="users/66d2e9a646572ef3e10f73e2/adjustcredit"
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

                                                <a href="users/66d2e9a646572ef3e10f73e2/transfercredit"
                                                    className="btn btn-outline-success"  >
                                                    <i className="fas fa-arrow-up"></i>
                                                </a>

                                                <a href="users/66d2e9a646572ef3e10f73e2/adjustcredit"
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

                                                <a href="users/66d2e9a646572ef3e10f73e2/transfercredit"
                                                    className="btn btn-outline-success"  >
                                                    <i className="fas fa-arrow-up"></i>
                                                </a>

                                                <a href="users/66d2e9a646572ef3e10f73e2/adjustcredit"
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
