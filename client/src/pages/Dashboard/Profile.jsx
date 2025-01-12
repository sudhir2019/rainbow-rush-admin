import React from 'react'

function Profile() {
    return (
        <>
            <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-title">Admin Detail</h6>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label for="exampleInputUsername2" className="control-label">Username</label>
                                        <input type="text" className="form-control" readOnly="" id="exampleInputUsername2" name="user_name" value="admin" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label className="control-label">Email</label>
                                        <input type="email" className="form-control" readOnly="" id="exampleInputEmail2" name="email" value="admin@gmail.com" placeholder="Email" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-title">Change Password</h6>
                            <form method="post" action="ch_profile" encType="multipart/form-data">
                                <input type="hidden" name="_token" value="6FW3yn1jblSSOhv8rgILM71bqXKFPvNpGyyvxtod" />          <div className="row">
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label for="exampleInputUsername2" className="control-label">Old Password</label>
                                            <input className="form-control" type="text" name="opass" placeholder="Enter Your old password" value="" />
                                        </div>
                                    </div>
                                </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <label className="control-label">New Password</label>
                                                <input className="form-control" type="text" name="npass" placeholder="Enter Your new password" value="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <label className="control-label">Confirm Password</label>
                                                <input className="form-control" type="text" name="cpass" placeholder="Enter Your confirm password" value="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group" style={{display:"flex", flexDirection:"row",gap:"5px"}}>
                                                <button type="submit" className="btn btn-primary ">Change Password</button>
                                                <button className="btn btn-light">Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile