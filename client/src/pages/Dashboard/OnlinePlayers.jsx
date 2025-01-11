import React, { useEffect } from 'react';

function OnlinePlayers() {
 

  return (
    <div className="row">
      <div className="col-md-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h6 className="card-title">Online Players</h6>
            <div className="table-responsive">
              <table
                className="table table-bordered data-table dataTable no-footer"
                id="example"
                role="grid"
                aria-describedby="example_info"
              >
                <thead>
                  <tr role="row">
                    <th>No</th>
                    <th>User Name</th>
                    <th>Unique Id</th>
                    <th>Points</th>
                    <th>Play Points</th>
                    <th>Win Points</th>
                    <th>Claim Points</th>
                    <th>End Points</th>
                    <th>Is Online</th>
                    <th>Last Login</th>
                  </tr>
                </thead>
                <tbody>
                  <tr role="row" className="odd">
                    <td>1</td>
                    <td>Players-1</td>
                    <td>user_0000000115</td>
                    <td>6,221.00</td>
                    <td>28720</td>
                    <td>23760</td>
                    <td>23760</td>
                    <td>4960</td>
                    <td><span className="badge text-white bg-success">Online</span></td>
                    <td>2024-08-19 03:46:31 PM</td>
                  </tr>
                  <tr role="row" className="even">
                    <td>2</td>
                    <td>Players-2</td>
                    <td>user_0000000115</td>
                    <td>6,221.00</td>
                    <td>28720</td>
                    <td>23760</td>
                    <td>23760</td>
                    <td>4960</td>
                    <td><span className="badge text-white bg-success">Online</span></td>
                    <td>2024-08-19 03:46:31 PM</td>
                  </tr>
                  <tr role="row" className="odd">
                    <td>3</td>
                    <td>Players-3</td>
                    <td>user_0000000115</td>
                    <td>6,221.00</td>
                    <td>28720</td>
                    <td>23760</td>
                    <td>23760</td>
                    <td>4960</td>
                    <td><span className="badge text-white bg-success">Online</span></td>
                    <td>2024-08-19 03:46:31 PM</td>
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

export default OnlinePlayers;
