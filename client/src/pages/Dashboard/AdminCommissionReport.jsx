import React, { useState } from 'react';

function AdminCommissionReport() {
    // State to manage active tab
    const [activeTab, setActiveTab] = useState('tab7');
    const [commissionData, setCommissionData] = useState([
        { id: 1, gameName: 'Game 1', commissionAmount: 1200, totalBetPoint: 1500, totalWonPoint: 800 },
        { id: 2, gameName: 'Game 2', commissionAmount: 900, totalBetPoint: 1100, totalWonPoint: 600 },
        // Add more data here
    ]);

    // Function to handle tab change
    const openTab = (event, tabName) => {
        setActiveTab(tabName);
    };

    return (
        <div className="row">
            <div className="col-md-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <div className="col-md-8 col-sm-12 col-xs-12 mt-2">
                            <div className="btn-group flex-wrap">
                                <a href="javascript:void(0)" 
                                   className={`btn btn-outline-info tablinks ${activeTab === 'tab1' ? 'active' : ''}`} 
                                   onClick={(e) => openTab(e, 'tab1')}>Last 6 Months</a>
                                <a href="javascript:void(0)" 
                                   className={`btn btn-outline-info tablinks ${activeTab === 'tab2' ? 'active' : ''}`} 
                                   onClick={(e) => openTab(e, 'tab2')}>Current Month</a>
                                <a href="javascript:void(0)" 
                                   className={`btn btn-outline-info tablinks ${activeTab === 'tab3' ? 'active' : ''}`} 
                                   onClick={(e) => openTab(e, 'tab3')}>Last Month</a>
                                <a href="javascript:void(0)" 
                                   className={`btn btn-outline-info tablinks ${activeTab === 'tab4' ? 'active' : ''}`} 
                                   onClick={(e) => openTab(e, 'tab4')}>Last Week</a>
                                <a href="javascript:void(0)" 
                                   className={`btn btn-outline-info tablinks ${activeTab === 'tab5' ? 'active' : ''}`} 
                                   onClick={(e) => openTab(e, 'tab5')}>Current Week</a>
                                <a href="javascript:void(0)" 
                                   className={`btn btn-outline-info tablinks ${activeTab === 'tab6' ? 'active' : ''}`} 
                                   onClick={(e) => openTab(e, 'tab6')}>Yesterday</a>
                                <a href="javascript:void(0)" 
                                   className={`btn btn-outline-info tablinks ${activeTab === 'tab7' ? 'active' : ''}`} 
                                   onClick={(e) => openTab(e, 'tab7')}>Today</a>
                                <button type="button" className="btn btn-outline-info" data-toggle="modal" data-target="#myModal">Date Range</button>
                            </div>
                        </div>
                    </div>

                    <div className="card-body">
                        <div className="">
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
                                                <td className="bg-gradient-primary text-white">Total Commission Point</td>
                                                <td className="bg-gradient-danger text-white">Total Bet Point</td>
                                                <td className="bg-gradient-info text-white">Total Won Point</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>10,812.00</td>
                                                <td>6,621.00</td>
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
                                                <table className="table table-bordered data-table dataTable no-footer" id="example">
                                                    <thead>
                                                        <tr>
                                                            <th>No</th>
                                                            <th>Game Name</th>
                                                            <th>Commission Amount</th>
                                                            <th>Total Bet Point</th>
                                                            <th>Total Won Point</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {commissionData.map((data, index) => (
                                                            <tr key={data.id}>
                                                                <td>{index + 1}</td>
                                                                <td>{data.gameName}</td>
                                                                <td>{data.commissionAmount}</td>
                                                                <td>{data.totalBetPoint}</td>
                                                                <td>{data.totalWonPoint}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminCommissionReport;
