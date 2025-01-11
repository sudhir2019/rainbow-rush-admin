import React from 'react'

function TurnOverReport() {
    return (
        <div className="row">
            <div className="col-md-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">

                        <div className="col-md-8 col-sm-12 col-xs-12 mt-2">
                            <div className="btn-group flex-wrap">
                                <a href="javascript:void(0)" className="btn btn-outline-info tablinks" onClick="openTab(event, 'tab1')">Last 6 Months</a>
                                <a href="javascript:void(0)" className="btn btn-outline-info tablinks" onClick="openTab(event, 'tab2')">Current Month</a>
                                <a href="javascript:void(0)" className="btn btn-outline-info tablinks" onClick="openTab(event, 'tab3')">Last Month</a>
                                <a href="javascript:void(0)" className="btn btn-outline-info tablinks" onClick="openTab(event, 'tab4')">Last Week</a>
                                <a href="javascript:void(0)" className="btn btn-outline-info tablinks" onClick="openTab(event, 'tab5')">Current Week</a>
                                <a href="javascript:void(0)" className="btn btn-outline-info tablinks" onClick="openTab(event, 'tab6')">Yesterday</a>
                                <a href="javascript:void(0)" className="btn btn-outline-info tablinks active" onClick="openTab(event, 'tab7')">Today</a>
                                <button type="button" className="btn btn-outline-info" data-toggle="modal" data-target="#myModal">Date Range</button>
                            </div>
                        </div>


                    </div>


                    <div className="card-body">
                        <div className="tabcontent" id="tab1">
                            <div className="row">

                                <div className="col-md-4 col-sm-12 col-xs-12 mt-2">
                                    <span className="date-display">25-09-2024</span>
                                </div>
                            </div>
                            <div className="row bg-light">
                                <div className="col-sm-12">
                                    <table className="table table-bordered text-center data-table-top">
                                        <thead>
                                            <tr>
                                                <td className="bg-gradient-primary text-white">Total PlayPoints</td>
                                                <td className="bg-gradient-danger text-white">Total WinPoints</td>
                                                <td className="bg-gradient-info text-white">End Point</td>
                                                <td className="bg-gradient-warning text-white">Total Commision</td>
                                                <td className="bg-gradient-info text-white">Net</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    10,812.00
                                                </td>
                                                <td>6,621.00</td>
                                                <td>3,931.00</td>
                                                <td>0.00</td>
                                                <td>3,931.00</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-header d-flex justify-content-between mb-2">
                                            <b>Admin Commission Report</b>
                                        </div>
                                        <div className="card-body">
                                            <div className="table-responsive">
                                                <div id="example_wrapper" className="dataTables_wrapper">
                                                    <div className="dataTables_length" id="example_length"><label>Show
                                                        <select name="example_length" aria-controls="example" className="">
                                                            <option value="10">10</option><option value="25">25</option>
                                                            <option value="50">50</option><option value="-1">All</option>
                                                        </select> entries</label></div><div className="dt-buttons">
                                                        <button className="dt-button buttons-excel buttons-html5" tabIndex="0" aria-controls="example" type="button"><span>Export to Excel</span></button> </div><div id="example_filter" className="dataTables_filter"><label>Search:<input type="search" className="" placeholder="" aria-controls="example" /></label></div><table className="table table-bordered data-table dataTable" id="example" role="grid" aria-describedby="example_info">
                                                        <thead>
                                                            <tr role="row"><th className="sorting_asc" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-sort="ascending" aria-label="No: activate to sort column descending" >No</th><th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-label="UserName: activate to sort column ascending" >UserName</th><th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-label="Play Point: activate to sort column ascending" >Play Point</th><th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-label="Win Point: activate to sort column ascending" >Win Point</th><th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-label="End Point: activate to sort column ascending" >End Point</th><th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-label="Super Commission: activate to sort column ascending" >Super Commission</th><th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-label="Distributer Commission: activate to sort column ascending" >Distributer Commission</th><th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-label="Retailer Commission: activate to sort column ascending" >Retailer Commission</th><th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-label="Net: activate to sort column ascending" >Net</th></tr>
                                                        </thead>
                                                        <tbody>


                                                            <tr role="row" className="odd">
                                                                <td className="sorting_1">1</td>
                                                                <td> admin
                                                                    <a href="Super-Distributer-Turnover-Report.html">
                                                                        <i className="far fa-eye"></i></a>
                                                                </td>
                                                                <td>39,13,677.00</td>
                                                                <td>31,13,854.5</td>
                                                                <td>7,99,650.5</td>
                                                                <td>165.4</td>
                                                                <td>-153.4</td>
                                                                <td>1,374.25</td>
                                                                <td>7,98,264.25</td>
                                                            </tr><tr role="row" className="even">
                                                                <td className="sorting_1">2</td>
                                                                <td> admin
                                                                    <a href="Super-Distributer-Turnover-Report.html">
                                                                        <i className="far fa-eye"></i></a>
                                                                </td>
                                                                <td>39,13,677.00</td>
                                                                <td>31,13,854.5</td>
                                                                <td>7,99,650.5</td>
                                                                <td>165.4</td>
                                                                <td>-153.4</td>
                                                                <td>1,374.25</td>
                                                                <td>7,98,264.25</td>
                                                            </tr></tbody>
                                                        <tfoot>
                                                            <tr><th colSpan="2"  rowSpan="1">Total:</th><th rowSpan="1" colSpan="1">₹3913677</th><th rowSpan="1" colSpan="1">₹3113854.5</th><th rowSpan="1" colSpan="1">₹799650.5</th><th rowSpan="1" colSpan="1">₹165.4</th><th rowSpan="1" colSpan="1">₹-153.4</th><th rowSpan="1" colSpan="1">₹1374.25</th><th rowSpan="1" colSpan="1">₹798264.25</th></tr>
                                                        </tfoot>

                                                    </table><div className="dataTables_info" id="example_info" role="status" aria-live="polite">Showing 1 to 2 of 2 entries</div><div className="dataTables_paginate paging_simple_numbers" id="example_paginate"><a className="paginate_button previous disabled" aria-controls="example" data-dt-idx="0" tabIndex="-1" id="example_previous">Previous</a><span><a className="paginate_button current" aria-controls="example" data-dt-idx="1" tabIndex="0">1</a></span><a className="paginate_button next disabled" aria-controls="example" data-dt-idx="2" tabIndex="-1" id="example_next">Next</a></div></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-light tabcontent" id="tab2">
                            <div className="row">

                                <div className="col-md-4 col-sm-12 col-xs-12 mt-2">
                                    <span className="date-display">25-09-2024</span>
                                </div>
                            </div>
                            <div className="row bg-light">
                                <div className="col-sm-12">
                                    <table className="table table-bordered text-center data-table-top">
                                        <thead>
                                            <tr>
                                                <td className="bg-gradient-primary text-white">Total PlayPoints</td>
                                                <td className="bg-gradient-danger text-white">Total WinPoints</td>
                                                <td className="bg-gradient-info text-white">End Point</td>
                                                <td className="bg-gradient-warning text-white">Total Commision</td>
                                                <td className="bg-gradient-info text-white">Net</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    10,812.00
                                                </td>
                                                <td>6,621.00</td>
                                                <td>3,931.00</td>
                                                <td>0.00</td>
                                                <td>3,931.00</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-header d-flex justify-content-between mb-2">
                                            <b>Admin Commission Report</b>
                                        </div>
                                        <div className="card-body">
                                            <div className="table-responsive">
                                                <div id="example-2_wrapper" className="dataTables_wrapper">
                                                    <div className="dataTables_length" id="example-2_length"><label>Show
                                                        <select name="example-2_length" aria-controls="example-2" className="">
                                                            <option value="10">10</option><option value="25">25</option>
                                                            <option value="50">50</option><option value="-1">All</option></select>
                                                        entries</label></div><div className="dt-buttons">
                                                        <button className="dt-button buttons-excel buttons-html5" tabIndex="0" aria-controls="example-2" type="button">
                                                            <span>Export to Excel</span></button> </div>
                                                    <div id="example-2_filter" className="dataTables_filter"><label>
                                                        Search:<input type="search" className="" placeholder="" aria-controls="example-2" /></label>
                                                    </div>
                                                    <table className="table table-bordered data-table dataTable" id="example-2" role="grid" aria-describedby="example-2_info" />
                                                    <thead>
                                                        <tr role="row"><th className="sorting_asc" tabIndex="0" aria-controls="example-2" rowSpan="1" colSpan="1" aria-sort="ascending" aria-label="No: activate to sort column descending" >No</th><th className="sorting" tabIndex="0" aria-controls="example-2" rowSpan="1" colSpan="1" aria-label="UserName: activate to sort column ascending" >UserName</th><th className="sorting" tabIndex="0" aria-controls="example-2" rowSpan="1" colSpan="1" aria-label="Play Point: activate to sort column ascending" >Play Point</th><th className="sorting" tabIndex="0" aria-controls="example-2" rowSpan="1" colSpan="1" aria-label="Win Point: activate to sort column ascending" >Win Point</th><th className="sorting" tabIndex="0" aria-controls="example-2" rowSpan="1" colSpan="1" aria-label="End Point: activate to sort column ascending" >End Point</th><th className="sorting" tabIndex="0" aria-controls="example-2" rowSpan="1" colSpan="1" aria-label="Super Commission: activate to sort column ascending" >Super Commission</th><th className="sorting" tabIndex="0" aria-controls="example-2" rowSpan="1" colSpan="1" aria-label="Distributer Commission: activate to sort column ascending" >Distributer Commission</th><th className="sorting" tabIndex="0" aria-controls="example-2" rowSpan="1" colSpan="1" aria-label="Retailer Commission: activate to sort column ascending" >Retailer Commission</th><th className="sorting" tabIndex="0" aria-controls="example-2" rowSpan="1" colSpan="1" aria-label="Net: activate to sort column ascending" >Net</th></tr>
                                                    </thead>
                                                    <tbody>



                                                        <tr role="row" className="odd">
                                                            <td className="sorting_1">1</td>
                                                            <td>admin <a href="Super-Distributer-Turnover-Report.html"><i className="far fa-eye"></i></a></td>
                                                            <td>26,24,981.00</td>
                                                            <td>20,78,588.5</td>
                                                            <td>5,46,260.5</td>
                                                            <td>0.00</td>
                                                            <td>0.00</td>
                                                            <td>0.00</td>
                                                            <td>5,46,260.5</td>
                                                        </tr><tr role="row" className="even">
                                                            <td className="sorting_1">2</td>
                                                            <td>admin <a href="Super-Distributer-Turnover-Report.html"><i className="far fa-eye"></i></a></td>
                                                            <td>26,24,981.00</td>
                                                            <td>20,78,588.5</td>
                                                            <td>5,46,260.5</td>
                                                            <td>0.00</td>
                                                            <td>0.00</td>
                                                            <td>0.00</td>
                                                            <td>5,46,260.5</td>
                                                        </tr></tbody>
                                                    <tfoot>
                                                        <tr><th colSpan="2"  rowSpan="1">Total:</th><th rowSpan="1" colSpan="1">₹2624981</th><th rowSpan="1" colSpan="1">₹2078588.5</th><th rowSpan="1" colSpan="1">₹546260.5</th><th rowSpan="1" colSpan="1">₹0</th><th rowSpan="1" colSpan="1">₹0</th><th rowSpan="1" colSpan="1">₹0</th><th rowSpan="1" colSpan="1">₹546260.5</th></tr>
                                                    </tfoot>

                                              
                                                <div className="dataTables_info" id="example-2_info" role="status" aria-live="polite">Showing 1 to 2 of 2 entries</div><div className="dataTables_paginate paging_simple_numbers" id="example-2_paginate"><a className="paginate_button previous disabled" aria-controls="example-2" data-dt-idx="0" tabIndex="-1" id="example-2_previous">Previous</a><span><a className="paginate_button current" aria-controls="example-2" data-dt-idx="1" tabIndex="0">1</a></span><a className="paginate_button next disabled" aria-controls="example-2" data-dt-idx="2" tabIndex="-1" id="example-2_next">Next</a></div></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-light tabcontent" id="tab3">
                        <div className="row">

                            <div className="col-md-4 col-sm-12 col-xs-12 mt-2">
                                <span className="date-display">25-09-2024</span>
                            </div>
                        </div>
                        <div className="row bg-light">
                            <div className="col-sm-12">
                                <table className="table table-bordered text-center data-table-top">
                                    <thead>
                                        <tr>
                                            <td className="bg-gradient-primary text-white">Total PlayPoints</td>
                                            <td className="bg-gradient-danger text-white">Total WinPoints</td>
                                            <td className="bg-gradient-info text-white">End Point</td>
                                            <td className="bg-gradient-warning text-white">Total Commision</td>
                                            <td className="bg-gradient-info text-white">Net</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                10,812.00
                                            </td>
                                            <td>6,621.00</td>
                                            <td>3,931.00</td>
                                            <td>0.00</td>
                                            <td>3,931.00</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-header d-flex justify-content-between mb-2">
                                        <b>Admin Commission Report</b>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <div id="example-3_wrapper" className="dataTables_wrapper"><div className="dataTables_length" id="example-3_length"><label>Show <select name="example-3_length" aria-controls="example-3" className=""><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="-1">All</option></select> entries</label></div><div className="dt-buttons"><button className="dt-button buttons-excel buttons-html5" tabIndex="0" aria-controls="example-3" type="button"><span>Export to Excel</span></button> </div><div id="example-3_filter" className="dataTables_filter"><label>Search:<input type="search" className="" placeholder="" aria-controls="example-3" /></label></div><table className="table table-bordered data-table dataTable" id="example-3" role="grid" aria-describedby="example-3_info">
                                                <thead>
                                                    <tr role="row"><th className="sorting_asc" tabIndex="0" aria-controls="example-3" rowSpan="1" colSpan="1" aria-sort="ascending" aria-label="No: activate to sort column descending" >No</th><th className="sorting" tabIndex="0" aria-controls="example-3" rowSpan="1" colSpan="1" aria-label="UserName: activate to sort column ascending" >UserName</th><th className="sorting" tabIndex="0" aria-controls="example-3" rowSpan="1" colSpan="1" aria-label="Play Point: activate to sort column ascending" >Play Point</th><th className="sorting" tabIndex="0" aria-controls="example-3" rowSpan="1" colSpan="1" aria-label="Win Point: activate to sort column ascending" >Win Point</th><th className="sorting" tabIndex="0" aria-controls="example-3" rowSpan="1" colSpan="1" aria-label="End Point: activate to sort column ascending" >End Point</th><th className="sorting" tabIndex="0" aria-controls="example-3" rowSpan="1" colSpan="1" aria-label="Super Commission: activate to sort column ascending" >Super Commission</th><th className="sorting" tabIndex="0" aria-controls="example-3" rowSpan="1" colSpan="1" aria-label="Distributer Commission: activate to sort column ascending" >Distributer Commission</th><th className="sorting" tabIndex="0" aria-controls="example-3" rowSpan="1" colSpan="1" aria-label="Retailer Commission: activate to sort column ascending" >Retailer Commission</th><th className="sorting" tabIndex="0" aria-controls="example-3" rowSpan="1" colSpan="1" aria-label="Net: activate to sort column ascending" >Net</th></tr>
                                                </thead>
                                                <tbody>



                                                    <tr role="row" className="odd">
                                                        <td className="sorting_1">1</td>
                                                        <td>admin <a href="Super-Distributer-Turnover-Report.html"><i className="far fa-eye"></i></a></td>
                                                        <td>9,76,622.00</td>
                                                        <td>8,27,009.00</td>
                                                        <td>1,49,613.00</td>
                                                        <td>165.4</td>
                                                        <td>-153.4</td>
                                                        <td>1,374.25</td>
                                                        <td>1,48,226.75</td>
                                                    </tr><tr role="row" className="even">
                                                        <td className="sorting_1">2</td>
                                                        <td>admin <a href="Super-Distributer-Turnover-Report.html"><i className="far fa-eye"></i></a></td>
                                                        <td>9,76,622.00</td>
                                                        <td>8,27,009.00</td>
                                                        <td>1,49,613.00</td>
                                                        <td>165.4</td>
                                                        <td>-153.4</td>
                                                        <td>1,374.25</td>
                                                        <td>1,48,226.75</td>
                                                    </tr></tbody>
                                                <tfoot>
                                                    <tr><th colSpan="2"  rowSpan="1">Total:</th><th rowSpan="1" colSpan="1">₹976622</th><th rowSpan="1" colSpan="1">₹827009</th><th rowSpan="1" colSpan="1">₹149613</th><th rowSpan="1" colSpan="1">₹165.4</th><th rowSpan="1" colSpan="1">₹-153.4</th><th rowSpan="1" colSpan="1">₹1374.25</th><th rowSpan="1" colSpan="1">₹148226.75</th></tr>
                                                </tfoot>

                                            </table><div className="dataTables_info" id="example-3_info" role="status" aria-live="polite">Showing 1 to 2 of 2 entries</div><div className="dataTables_paginate paging_simple_numbers" id="example-3_paginate"><a className="paginate_button previous disabled" aria-controls="example-3" data-dt-idx="0" tabIndex="-1" id="example-3_previous">Previous</a><span><a className="paginate_button current" aria-controls="example-3" data-dt-idx="1" tabIndex="0">1</a></span><a className="paginate_button next disabled" aria-controls="example-3" data-dt-idx="2" tabIndex="-1" id="example-3_next">Next</a></div></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-light tabcontent" id="tab4">
                        <div className="row">
                          
                            <div className="col-md-4 col-sm-12 col-xs-12 mt-2">
                                <span className="date-display">25-09-2024</span>
                            </div>
                        </div>
                        <div className="row bg-light">
                            <div className="col-sm-12">
                                <table className="table table-bordered text-center data-table-top">
                                    <thead>
                                        <tr>
                                            <td className="bg-gradient-primary text-white">Total PlayPoints</td>
                                            <td className="bg-gradient-danger text-white">Total WinPoints</td>
                                            <td className="bg-gradient-info text-white">End Point</td>
                                            <td className="bg-gradient-warning text-white">Total Commision</td>
                                            <td className="bg-gradient-info text-white">Net</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                10,812.00
                                            </td>
                                            <td>6,621.00</td>
                                            <td>3,931.00</td>
                                            <td>0.00</td>
                                            <td>3,931.00</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-header d-flex justify-content-between mb-2">
                                        <b>Admin Commission Report</b>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <div id="example-4_wrapper" className="dataTables_wrapper"><div className="dataTables_length" id="example-4_length"><label>Show <select name="example-4_length" aria-controls="example-4" className=""><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="-1">All</option></select> entries</label></div><div className="dt-buttons"><button className="dt-button buttons-excel buttons-html5" tabIndex="0" aria-controls="example-4" type="button"><span>Export to Excel</span></button> </div><div id="example-4_filter" className="dataTables_filter"><label>Search:<input type="search" className="" placeholder="" aria-controls="example-4" /></label></div><table className="table table-bordered data-table dataTable" id="example-4" role="grid" aria-describedby="example-4_info">
                                                <thead>
                                                    <tr role="row"><th className="sorting_asc" tabIndex="0" aria-controls="example-4" rowSpan="1" colSpan="1" aria-sort="ascending" aria-label="No: activate to sort column descending" >No</th><th className="sorting" tabIndex="0" aria-controls="example-4" rowSpan="1" colSpan="1" aria-label="UserName: activate to sort column ascending" >UserName</th><th className="sorting" tabIndex="0" aria-controls="example-4" rowSpan="1" colSpan="1" aria-label="Play Point: activate to sort column ascending" >Play Point</th><th className="sorting" tabIndex="0" aria-controls="example-4" rowSpan="1" colSpan="1" aria-label="Win Point: activate to sort column ascending" >Win Point</th><th className="sorting" tabIndex="0" aria-controls="example-4" rowSpan="1" colSpan="1" aria-label="End Point: activate to sort column ascending" >End Point</th><th className="sorting" tabIndex="0" aria-controls="example-4" rowSpan="1" colSpan="1" aria-label="Super Commission: activate to sort column ascending" >Super Commission</th><th className="sorting" tabIndex="0" aria-controls="example-4" rowSpan="1" colSpan="1" aria-label="Distributer Commission: activate to sort column ascending" >Distributer Commission</th><th className="sorting" tabIndex="0" aria-controls="example-4" rowSpan="1" colSpan="1" aria-label="Retailer Commission: activate to sort column ascending" >Retailer Commission</th><th className="sorting" tabIndex="0" aria-controls="example-4" rowSpan="1" colSpan="1" aria-label="Net: activate to sort column ascending" >Net</th></tr>
                                                </thead>
                                                <tbody>



                                                    <tr role="row" className="odd">
                                                        <td className="sorting_1">1</td>
                                                        <td>admin <a href="Super-Distributer-Turnover-Report.html"><i className="far fa-eye"></i></a></td>
                                                        <td>5,05,555.00</td>
                                                        <td>3,96,356.5</td>
                                                        <td>1,09,181.5</td>
                                                        <td>0.00</td>
                                                        <td>0.00</td>
                                                        <td>0.00</td>
                                                        <td>1,09,181.5</td>
                                                    </tr><tr role="row" className="even">
                                                        <td className="sorting_1">2</td>
                                                        <td>admin <a href="Super-Distributer-Turnover-Report.html"><i className="far fa-eye"></i></a></td>
                                                        <td>5,05,555.00</td>
                                                        <td>3,96,356.5</td>
                                                        <td>1,09,181.5</td>
                                                        <td>0.00</td>
                                                        <td>0.00</td>
                                                        <td>0.00</td>
                                                        <td>1,09,181.5</td>
                                                    </tr></tbody>
                                                <tfoot>
                                                    <tr><th colSpan="2"  rowSpan="1">Total:</th><th rowSpan="1" colSpan="1">₹505555</th><th rowSpan="1" colSpan="1">₹396356.5</th><th rowSpan="1" colSpan="1">₹109181.5</th><th rowSpan="1" colSpan="1">₹0</th><th rowSpan="1" colSpan="1">₹0</th><th rowSpan="1" colSpan="1">₹0</th><th rowSpan="1" colSpan="1">₹109181.5</th></tr>
                                                </tfoot>

                                            </table><div className="dataTables_info" id="example-4_info" role="status" aria-live="polite">Showing 1 to 2 of 2 entries</div><div className="dataTables_paginate paging_simple_numbers" id="example-4_paginate"><a className="paginate_button previous disabled" aria-controls="example-4" data-dt-idx="0" tabIndex="-1" id="example-4_previous">Previous</a><span><a className="paginate_button current" aria-controls="example-4" data-dt-idx="1" tabIndex="0">1</a></span><a className="paginate_button next disabled" aria-controls="example-4" data-dt-idx="2" tabIndex="-1" id="example-4_next">Next</a></div></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-light tabcontent" id="tab5">
                        <div className="row">
                           
                            <div className="col-md-4 col-sm-12 col-xs-12 mt-2">
                                <span className="date-display">25-09-2024</span>
                            </div>
                        </div>
                        <div className="row bg-light">
                            <div className="col-sm-12">
                                <table className="table table-bordered text-center data-table-top">
                                    <thead>
                                        <tr>
                                            <td className="bg-gradient-primary text-white">Total PlayPoints</td>
                                            <td className="bg-gradient-danger text-white">Total WinPoints</td>
                                            <td className="bg-gradient-info text-white">End Point</td>
                                            <td className="bg-gradient-warning text-white">Total Commision</td>
                                            <td className="bg-gradient-info text-white">Net</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                10,812.00
                                            </td>
                                            <td>6,621.00</td>
                                            <td>3,931.00</td>
                                            <td>0.00</td>
                                            <td>3,931.00</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-header d-flex justify-content-between mb-2">
                                        <b>Admin Commission Report</b>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <div id="example-5_wrapper" className="dataTables_wrapper"><div className="dataTables_length" id="example-5_length"><label>Show <select name="example-5_length" aria-controls="example-5" className=""><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="-1">All</option></select> entries</label></div><div className="dt-buttons"><button className="dt-button buttons-excel buttons-html5" tabIndex="0" aria-controls="example-5" type="button"><span>Export to Excel</span></button> </div><div id="example-5_filter" className="dataTables_filter"><label>Search:<input type="search" className="" placeholder="" aria-controls="example-5" /></label></div><table className="table table-bordered data-table dataTable" id="example-5" role="grid" aria-describedby="example-5_info">
                                                <thead>
                                                    <tr role="row"><th className="sorting_asc" tabIndex="0" aria-controls="example-5" rowSpan="1" colSpan="1" aria-sort="ascending" aria-label="No: activate to sort column descending" >No</th><th className="sorting" tabIndex="0" aria-controls="example-5" rowSpan="1" colSpan="1" aria-label="UserName: activate to sort column ascending" >UserName</th><th className="sorting" tabIndex="0" aria-controls="example-5" rowSpan="1" colSpan="1" aria-label="Play Point: activate to sort column ascending" >Play Point</th><th className="sorting" tabIndex="0" aria-controls="example-5" rowSpan="1" colSpan="1" aria-label="Win Point: activate to sort column ascending" >Win Point</th><th className="sorting" tabIndex="0" aria-controls="example-5" rowSpan="1" colSpan="1" aria-label="End Point: activate to sort column ascending" >End Point</th><th className="sorting" tabIndex="0" aria-controls="example-5" rowSpan="1" colSpan="1" aria-label="Super Commission: activate to sort column ascending" >Super Commission</th><th className="sorting" tabIndex="0" aria-controls="example-5" rowSpan="1" colSpan="1" aria-label="Distributer Commission: activate to sort column ascending" >Distributer Commission</th><th className="sorting" tabIndex="0" aria-controls="example-5" rowSpan="1" colSpan="1" aria-label="Retailer Commission: activate to sort column ascending" >Retailer Commission</th><th className="sorting" tabIndex="0" aria-controls="example-5" rowSpan="1" colSpan="1" aria-label="Net: activate to sort column ascending" >Net</th></tr>
                                                </thead>
                                                <tbody>



                                                    <tr role="row" className="odd">
                                                        <td className="sorting_1">1</td>
                                                        <td>admin<a href="Super-Distributer-Turnover-Report.html"><i className="far fa-eye"></i></a></td>
                                                        <td>7,04,497.00</td>
                                                        <td>5,77,200.00</td>
                                                        <td>1,27,262.00</td>
                                                        <td>0.00</td>
                                                        <td>0.00</td>
                                                        <td>0.00</td>
                                                        <td>1,27,262.00</td>
                                                    </tr><tr role="row" className="even">
                                                        <td className="sorting_1">2</td>
                                                        <td>admin<a href="Super-Distributer-Turnover-Report.html"><i className="far fa-eye"></i></a></td>
                                                        <td>7,04,497.00</td>
                                                        <td>5,77,200.00</td>
                                                        <td>1,27,262.00</td>
                                                        <td>0.00</td>
                                                        <td>0.00</td>
                                                        <td>0.00</td>
                                                        <td>1,27,262.00</td>
                                                    </tr></tbody>
                                                <tfoot>
                                                    <tr><th colSpan="2"  rowSpan="1">Total:</th><th rowSpan="1" colSpan="1">₹704497</th><th rowSpan="1" colSpan="1">₹577200</th><th rowSpan="1" colSpan="1">₹127262</th><th rowSpan="1" colSpan="1">₹0</th><th rowSpan="1" colSpan="1">₹0</th><th rowSpan="1" colSpan="1">₹0</th><th rowSpan="1" colSpan="1">₹127262</th></tr>
                                                </tfoot>

                                            </table><div className="dataTables_info" id="example-5_info" role="status" aria-live="polite">Showing 1 to 2 of 2 entries</div><div className="dataTables_paginate paging_simple_numbers" id="example-5_paginate"><a className="paginate_button previous disabled" aria-controls="example-5" data-dt-idx="0" tabIndex="-1" id="example-5_previous">Previous</a><span><a className="paginate_button current" aria-controls="example-5" data-dt-idx="1" tabIndex="0">1</a></span><a className="paginate_button next disabled" aria-controls="example-5" data-dt-idx="2" tabIndex="-1" id="example-5_next">Next</a></div></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-light tabcontent" id="tab6">
                        <div className="row">
                           
                            <div className="col-md-4 col-sm-12 col-xs-12 mt-2">
                                <span className="date-display">25-09-2024</span>
                            </div>
                        </div>
                        <div className="row bg-light">
                            <div className="col-sm-12">
                                <table className="table table-bordered text-center data-table-top">
                                    <thead>
                                        <tr>
                                            <td className="bg-gradient-primary text-white">Total PlayPoints</td>
                                            <td className="bg-gradient-danger text-white">Total WinPoints</td>
                                            <td className="bg-gradient-info text-white">End Point</td>
                                            <td className="bg-gradient-warning text-white">Total Commision</td>
                                            <td className="bg-gradient-info text-white">Net</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                10,812.00
                                            </td>
                                            <td>6,621.00</td>
                                            <td>3,931.00</td>
                                            <td>0.00</td>
                                            <td>3,931.00</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-header d-flex justify-content-between mb-2">
                                        <b>Admin Commission Report</b>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <div id="example-6_wrapper" className="dataTables_wrapper"><div className="dataTables_length" id="example-6_length"><label>Show <select name="example-6_length" aria-controls="example-6" className=""><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="-1">All</option></select> entries</label></div><div className="dt-buttons"><button className="dt-button buttons-excel buttons-html5" tabIndex="0" aria-controls="example-6" type="button"><span>Export to Excel</span></button> </div><div id="example-6_filter" className="dataTables_filter"><label>Search:<input type="search" className="" placeholder="" aria-controls="example-6" /></label></div><table className="table table-bordered data-table dataTable" id="example-6" role="grid" aria-describedby="example-6_info">
                                                <thead>
                                                    <tr role="row"><th className="sorting_asc" tabIndex="0" aria-controls="example-6" rowSpan="1" colSpan="1" aria-sort="ascending" aria-label="No: activate to sort column descending" >No</th><th className="sorting" tabIndex="0" aria-controls="example-6" rowSpan="1" colSpan="1" aria-label="UserName: activate to sort column ascending" >UserName</th><th className="sorting" tabIndex="0" aria-controls="example-6" rowSpan="1" colSpan="1" aria-label="Play Point: activate to sort column ascending" >Play Point</th><th className="sorting" tabIndex="0" aria-controls="example-6" rowSpan="1" colSpan="1" aria-label="Win Point: activate to sort column ascending" >Win Point</th><th className="sorting" tabIndex="0" aria-controls="example-6" rowSpan="1" colSpan="1" aria-label="End Point: activate to sort column ascending" >End Point</th><th className="sorting" tabIndex="0" aria-controls="example-6" rowSpan="1" colSpan="1" aria-label="Super Commission: activate to sort column ascending" >Super Commission</th><th className="sorting" tabIndex="0" aria-controls="example-6" rowSpan="1" colSpan="1" aria-label="Distributer Commission: activate to sort column ascending" >Distributer Commission</th><th className="sorting" tabIndex="0" aria-controls="example-6" rowSpan="1" colSpan="1" aria-label="Retailer Commission: activate to sort column ascending" >Retailer Commission</th><th className="sorting" tabIndex="0" aria-controls="example-6" rowSpan="1" colSpan="1" aria-label="Net: activate to sort column ascending" >Net</th></tr>
                                                </thead>
                                                <tbody>



                                                    <tr role="row" className="odd">
                                                        <td className="sorting_1">1</td>
                                                        <td>admin <a href="Super-Distributer-Turnover-Report.html"><i className="far fa-eye"></i></a></td>
                                                        <td>1,47,182.00</td>
                                                        <td>1,15,487.5</td>
                                                        <td>31,703.5</td>
                                                        <td>0.00</td>
                                                        <td>0.00</td>
                                                        <td>0.00</td>
                                                        <td>31,703.5</td>
                                                    </tr><tr role="row" className="even">
                                                        <td className="sorting_1">2</td>
                                                        <td>admin <a href="Super-Distributer-Turnover-Report.html"><i className="far fa-eye"></i></a></td>
                                                        <td>1,47,182.00</td>
                                                        <td>1,15,487.5</td>
                                                        <td>31,703.5</td>
                                                        <td>0.00</td>
                                                        <td>0.00</td>
                                                        <td>0.00</td>
                                                        <td>31,703.5</td>
                                                    </tr></tbody>
                                                <tfoot>
                                                    <tr><th colSpan="2"  rowSpan="1">Total:</th><th rowSpan="1" colSpan="1">₹147182</th><th rowSpan="1" colSpan="1">₹115487.5</th><th rowSpan="1" colSpan="1">₹31703.5</th><th rowSpan="1" colSpan="1">₹0</th><th rowSpan="1" colSpan="1">₹0</th><th rowSpan="1" colSpan="1">₹0</th><th rowSpan="1" colSpan="1">₹31703.5</th></tr>
                                                </tfoot>

                                            </table><div className="dataTables_info" id="example-6_info" role="status" aria-live="polite">Showing 1 to 2 of 2 entries</div><div className="dataTables_paginate paging_simple_numbers" id="example-6_paginate"><a className="paginate_button previous disabled" aria-controls="example-6" data-dt-idx="0" tabIndex="-1" id="example-6_previous">Previous</a><span><a className="paginate_button current" aria-controls="example-6" data-dt-idx="1" tabIndex="0">1</a></span><a className="paginate_button next disabled" aria-controls="example-6" data-dt-idx="2" tabIndex="-1" id="example-6_next">Next</a></div></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tabcontent active" id="tab7">
                        <div className="row">
                           
                            <div className="col-md-4 col-sm-12 col-xs-12 mt-2">
                                <span className="bg-success text-white p-1 px-2 rounded">01-08-2024</span>&nbsp;&nbsp;to&nbsp;&nbsp;
                                <span className="bg-success text-white p-1 px-2 rounded">31-08-2024</span>
                            </div>
                        </div>
                        <div className="row bg-light">
                            <div className="col-sm-12">
                                <table className="table table-bordered text-center data-table-top">
                                    <thead>
                                        <tr>
                                            <td className="bg-gradient-primary text-white">Total PlayPoints</td>
                                            <td className="bg-gradient-danger text-white">Total WinPoints</td>
                                            <td className="bg-gradient-info text-white">End Point</td>
                                            <td className="bg-gradient-warning text-white">Total Commision</td>
                                            <td className="bg-gradient-info text-white">Net</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                10,812.00
                                            </td>
                                            <td>6,621.00</td>
                                            <td>3,931.00</td>
                                            <td>0.00</td>
                                            <td>3,931.00</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-header d-flex justify-content-between mb-2">
                                        <b>Admin Commission Report</b>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <div id="example-7_wrapper" className="dataTables_wrapper"><div className="dataTables_length" id="example-7_length"><label>Show <select name="example-7_length" aria-controls="example-7" className=""><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="-1">All</option></select> entries</label></div><div className="dt-buttons"><button className="dt-button buttons-excel buttons-html5" tabIndex="0" aria-controls="example-7" type="button"><span>Export to Excel</span></button> </div><div id="example-7_filter" className="dataTables_filter"><label>Search:<input type="search" className="" placeholder="" aria-controls="example-7" /></label></div><table className="table table-bordered data-table dataTable" id="example-7" role="grid" aria-describedby="example-7_info">
                                                <thead>
                                                    <tr role="row"><th className="sorting_asc" tabIndex="0" aria-controls="example-7" rowSpan="1" colSpan="1" aria-sort="ascending" aria-label="No: activate to sort column descending" >No</th><th className="sorting" tabIndex="0" aria-controls="example-7" rowSpan="1" colSpan="1" aria-label="UserName: activate to sort column ascending" >UserName</th><th className="sorting" tabIndex="0" aria-controls="example-7" rowSpan="1" colSpan="1" aria-label="Play Point: activate to sort column ascending" >Play Point</th><th className="sorting" tabIndex="0" aria-controls="example-7" rowSpan="1" colSpan="1" aria-label="Win Point: activate to sort column ascending" >Win Point</th><th className="sorting" tabIndex="0" aria-controls="example-7" rowSpan="1" colSpan="1" aria-label="End Point: activate to sort column ascending" >End Point</th><th className="sorting" tabIndex="0" aria-controls="example-7" rowSpan="1" colSpan="1" aria-label="Super Commission: activate to sort column ascending" >Super Commission</th><th className="sorting" tabIndex="0" aria-controls="example-7" rowSpan="1" colSpan="1" aria-label="Distributer Commission: activate to sort column ascending">Distributer Commission</th><th className="sorting" tabIndex="0" aria-controls="example-7" rowSpan="1" colSpan="1" aria-label="Retailer Commission: activate to sort column ascending" >Retailer Commission</th><th className="sorting" tabIndex="0" aria-controls="example-7" rowSpan="1" colSpan="1" aria-label="Net: activate to sort column ascending">Net</th></tr>
                                                </thead>
                                                <tbody>



                                                    <tr role="row" className="odd">
                                                        <td className="sorting_1">1</td>
                                                        <td>admin <a href="Super-Distributer-Turnover-Report.html"><i className="far fa-eye"></i></a></td>
                                                        <td>12,762.00</td>
                                                        <td>8,781.00</td>
                                                        <td>3,956.00</td>
                                                        <td>0.00</td>
                                                        <td>0.00</td>
                                                        <td>0.00</td>
                                                        <td>3,956.00</td>
                                                    </tr><tr role="row" className="even">
                                                        <td className="sorting_1">2</td>
                                                        <td>admin <a href="Super-Distributer-Turnover-Report.html"><i className="far fa-eye"></i></a></td>
                                                        <td>12,762.00</td>
                                                        <td>8,781.00</td>
                                                        <td>3,956.00</td>
                                                        <td>0.00</td>
                                                        <td>0.00</td>
                                                        <td>0.00</td>
                                                        <td>3,956.00</td>
                                                    </tr></tbody>
                                                <tfoot>
                                                    <tr><th colSpan="2"  rowSpan="1">Total:</th><th rowSpan="1" colSpan="1">₹12762</th><th rowSpan="1" colSpan="1">₹8781</th><th rowSpan="1" colSpan="1">₹3956</th><th rowSpan="1" colSpan="1">₹0</th><th rowSpan="1" colSpan="1">₹0</th><th rowSpan="1" colSpan="1">₹0</th><th rowSpan="1" colSpan="1">₹3956</th></tr>
                                                </tfoot>

                                            </table><div className="dataTables_info" id="example-7_info" role="status" aria-live="polite">Showing 1 to 2 of 2 entries</div><div className="dataTables_paginate paging_simple_numbers" id="example-7_paginate"><a className="paginate_button previous disabled" aria-controls="example-7" data-dt-idx="0" tabIndex="-1" id="example-7_previous">Previous</a><span><a className="paginate_button current" aria-controls="example-7" data-dt-idx="1" tabIndex="0">1</a></span><a className="paginate_button next disabled" aria-controls="example-7" data-dt-idx="2" tabIndex="-1" id="example-7_next">Next</a></div></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</div >
  )
}

export default TurnOverReport