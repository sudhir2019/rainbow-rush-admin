import React, { useState } from 'react';

function TransactionReport() {
  // State management for form fields
  const [status, setStatus] = useState('');
  const [userId, setUserId] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Handle changes for 'status' and 'user_id' selects
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleEntriesChange = (e) => {
    setEntriesPerPage(e.target.value);
  };

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
                <label><strong>Select Date :</strong></label>
                <div className="d-flex">
                  <div className="input-group date datepicker" id="datePickerExample1">
                    <input type="date" className="form-control" name="to" id="to" />
                  </div>
                </div>
              </div>

              <div className="mr-2">
                <label><strong>Filter :</strong></label>
                <div className="d-flex">
                  <select
                    id="status"
                    className="form-control mr-2"
                    style={{ width: '200px' }}
                    value={status}
                    onChange={handleStatusChange}
                  >
                    <option value="">--Select Transaction Type--</option>
                    <option value="2">Transfered</option>
                    <option value="3">Adjusted</option>
                  </select>
                  <select
                    id="user_id"
                    className="form-control"
                    style={{ width: '200px' }}
                    value={userId}
                    onChange={handleUserIdChange}
                  >
                    <option value="">--Select User--</option>
                    <option value="66585f1745c592e98605fd19">punesd</option>
                    <option value="66585f3fb72918110f0cc338">Khandalasd</option>
                    <option value="6696650876d23cf39002e218">snsinga001</option>
                    <option value="66c22f32bce28d04e205b642">emirates</option>
                    <option value="66d84c94df109e0af4057bf4">bkpatil</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="table-responsive">
              <div id="example_wrapper" className="dataTables_wrapper">
                <div className="dataTables_length" id="example_length">
                  <label>
                    Show
                    <select
                      name="example_length"
                      aria-controls="example"
                      value={entriesPerPage}
                      onChange={handleEntriesChange}
                    >
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="-1">All</option>
                    </select>
                    entries
                  </label>
                </div>

                <div className="dt-buttons">
                  <button className="dt-button buttons-excel buttons-html5" tabIndex="0" aria-controls="example" type="button">
                    <span>Export to Excel</span>
                  </button>
                </div>

                <div id="example_filter" className="dataTables_filter">
                  <label>
                    Search:
                    <input type="search" className="" placeholder="" aria-controls="example" />
                  </label>
                </div>

                <table className="table table-bordered data-table dataTable" id="example" role="grid" aria-describedby="example_info">
                  <thead>
                    <tr role="row">
                      <th className="sorting_asc" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-sort="ascending" aria-label="No: activate to sort column descending" style={{ width: '17.25px' }}>No</th>
                      <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-label="Name: activate to sort column ascending" style={{ width: '43.0938px' }}>Name</th>
                      <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-label="Credit: activate to sort column ascending" style={{ width: '76.2656px' }}>Credit</th>
                      <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-label="Debit: activate to sort column ascending" style={{ width: '170.016px' }}>Debit</th>
                      <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-label="New Balance: activate to sort column ascending" style={{ width: '84.8125px' }}>New Balance</th>
                      <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-label="Tran Type Message: activate to sort column ascending" style={{ width: '225.141px' }}>Tran Type Message</th>
                      <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-label="Created Date: activate to sort column ascending" style={{ width: '131.516px' }}>Created Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr role="row" className="odd">
                      <td className="sorting_1">1</td>
                      <td>snsinga001</td>
                      <td>0</td>
                      <td>10000</td>
                      <td>-1155663000</td>
                      <td>Adjust Admin to distributer (snsinga001)</td>
                      <td className="sorting_1">2024-09-15 07:23:53 PM</td>
                    </tr>
                    <tr role="row" className="even">
                      <td className="sorting_1">2</td>
                      <td>snsinga001</td>
                      <td>0</td>
                      <td>10000</td>
                      <td>-1155663000</td>
                      <td>Adjust Admin to distributer (snsinga001)</td>
                      <td className="sorting_1">2024-09-15 07:23:53 PM</td>
                    </tr>
                    <tr role="row" className="odd">
                      <td className="sorting_1">3</td>
                      <td>snsinga001</td>
                      <td>0</td>
                      <td>10000</td>
                      <td>-1155663000</td>
                      <td>Adjust Admin to distributer (snsinga001)</td>
                      <td className="sorting_1">2024-09-15 07:23:53 PM</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <th colSpan="2" style={{ textAlign: 'right' }} rowSpan="1">Total:</th>
                      <th rowSpan="1" colSpan="1">₹0 ( ₹0 total)</th>
                      <th rowSpan="1" colSpan="1">₹1621000 ( ₹1621000 total)</th>
                      <th rowSpan="1" colSpan="1"></th>
                      <th rowSpan="1" colSpan="1"></th>
                      <th rowSpan="1" colSpan="1"></th>
                    </tr>
                  </tfoot>
                </table>

                <div className="dataTables_info" id="example_info" role="status" aria-live="polite">
                  Showing 1 to 3 of 3 entries
                </div>
                <div className="dataTables_paginate paging_simple_numbers" id="example_paginate">
                  <a className="paginate_button previous disabled" aria-controls="example" data-dt-idx="0" tabIndex="-1" id="example_previous">Previous</a>
                  <span>
                    <a className="paginate_button current" aria-controls="example" data-dt-idx="1" tabIndex="0">1</a>
                  </span>
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

export default TransactionReport;
