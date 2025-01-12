import React from 'react';

function CommissionPayout() {
  const commissionData = [
    { id: 1, username: "punesd", role: "Super Distributer", commissionPercentage: 0, totalCommission: 172.9, createdAt: "2024-05-30 04:42:23 PM" },
    { id: 2, username: "punesd", role: "Distributer", commissionPercentage: 0, totalCommission: 172.9, createdAt: "2024-05-30 04:42:23 PM" },
    { id: 3, username: "punesd", role: "Retailer", commissionPercentage: 0, totalCommission: 172.9, createdAt: "2024-05-30 04:42:23 PM" }
  ];

  return (
    <div className="row">
      <div className="col-md-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-header d-flex justify-content-between mb-2">
            <b>Pending Commission</b>
          </div>
          <div className="card-body">
            <div className="form-group d-flex">
              <div className="mr-2">
                <label><strong>Select Role :</strong></label>
                <div className="d-flex">
                  <select id="game_type" className="js-example-basic-single w-100" style={{ width: '200px' }}>
                    <option value="">--Select Role--</option>
                    <option value="Super Distributer">SuperDistributer</option>
                    <option value="Distributer">Distributer</option>
                    <option value="Retailer">Retailer</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="table-responsive">
              <div id="example_wrapper" className="dataTables_wrapper no-footer">
                <div className="dataTables_length" id="example_length">
                  <label>Show 
                    <select name="example_length" aria-controls="example" className="">
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="-1">All</option>
                    </select> entries
                  </label>
                </div>
                <div className="dt-buttons">
                  <button className="dt-button buttons-excel buttons-html5" tabIndex="0" aria-controls="example" type="button">
                    <span>Export to Excel</span>
                  </button>
                </div>
                <div id="example_filter" className="dataTables_filter">
                  <label>Search:<input type="search" className="" placeholder="" aria-controls="example" /></label>
                </div>

                <table className="table table-bordered data-table dataTable no-footer" id="example" role="grid" aria-describedby="example_info">
                  <thead>
                    <tr role="row">
                      <th className="sorting_asc" tabIndex="0" aria-controls="example" rowspan="1" colspan="1" aria-sort="ascending" aria-label="No: activate to sort column descending" style={{ width: '28.9062px' }}>No</th>
                      <th className="sorting" tabIndex="0" aria-controls="example" rowspan="1" colspan="1" aria-label="UserName: activate to sort column ascending" style={{ width: '86.0156px' }}>UserName</th>
                      <th className="sorting" tabIndex="0" aria-controls="example" rowspan="1" colspan="1" aria-label="Role: activate to sort column ascending" style={{ width: '102.859px' }}>Role</th>
                      <th className="sorting" tabIndex="0" aria-controls="example" rowspan="1" colspan="1" aria-label="commission_percentage: activate to sort column ascending" style={{ width: '193.234px' }}>Commission Percentage</th>
                      <th className="sorting" tabIndex="0" aria-controls="example" rowspan="1" colspan="1" aria-label="Total Commission: activate to sort column ascending" style={{ width: '142.328px' }}>Total Commission</th>
                      <th className="sorting" tabIndex="0" aria-controls="example" rowspan="1" colspan="1" aria-label="CreatedAt: activate to sort column ascending" style={{ width: '170.656px' }}>Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commissionData.map((data, index) => (
                      <tr role="row" key={data.id} className={index % 2 === 0 ? "even" : "odd"}>
                        <td className="sorting_1">{data.id}</td>
                        <td>{data.username}</td>
                        <td>{data.role}</td>
                        <td>{data.commissionPercentage}</td>
                        <td>{data.totalCommission}</td>
                        <td>{data.createdAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="dataTables_info" id="example_info" role="status" aria-live="polite">
                  Showing 1 to {commissionData.length} of {commissionData.length} entries
                </div>

                <div className="dataTables_paginate paging_simple_numbers" id="example_paginate">
                  <a className="paginate_button previous disabled" aria-controls="example" data-dt-idx="0" tabIndex="-1" id="example_previous">Previous</a>
                  <span><a className="paginate_button current" aria-controls="example" data-dt-idx="1" tabIndex="0">1</a></span>
                  <a className="paginate_button next disabled" aria-controls="example" data-dt-idx="2" tabIndex="-1" id="example_next">Next</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommissionPayout;
