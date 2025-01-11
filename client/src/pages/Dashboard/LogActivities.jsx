import React, { useState } from 'react';

function LogActivities() {
    // State for selected date
    const [selectedDate, setSelectedDate] = useState('');
    
    // Sample log data (replace with real API data in a real-world app)
    const [logData, setLogData] = useState([
        {
            id: 1,
            username: 'admin',
            subject: 'Lal 300 Adjust credit to user via retailer rajshree',
            url: 'http://13.232.54.110/retailer/users/66ebeb81f1a1b51c4607a076/adjustcredit',
            method: 'POST',
            ip: '157.33.211.244',
            created: '2024-09-27 07:41:11 PM',
        },
        {
            id: 2,
            username: 'admin',
            subject: 'Lal 300 Adjust credit to user via retailer rajshree',
            url: 'http://13.232.54.110/retailer/users/66ebeb81f1a1b51c4607a076/adjustcredit',
            method: 'POST',
            ip: '157.33.211.244',
            created: '2024-09-27 07:41:11 PM',
        },
        {
            id: 3,
            username: 'admin',
            subject: 'Lal 300 Adjust credit to user via retailer rajshree',
            url: 'http://13.232.54.110/retailer/users/66ebeb81f1a1b51c4607a076/adjustcredit',
            method: 'POST',
            ip: '157.33.211.244',
            created: '2024-09-27 07:41:11 PM',
        }
    ]);

    // Handle date change
    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    // Handle search query
    const [searchQuery, setSearchQuery] = useState('');
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter logs based on date and search query
    const filteredLogs = logData.filter(log => {
        const matchesDate = selectedDate ? log.created.includes(selectedDate) : true;
        const matchesSearch = log.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              log.username.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesDate && matchesSearch;
    });

    return (
        <div className="row">
            <div className="col-md-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h6 className="card-title">Log Activities</h6>
                        <div className="form-group d-flex">
                            <div className="mr-2">
                                <label><strong>Select Date :</strong></label>
                                <div className="d-flex">
                                    <div className="input-group date datepicker" id="datePickerExample1">
                                        <input 
                                            type="date" 
                                            className="form-control" 
                                            name="to" 
                                            id="to" 
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="ml-2">
                                <label><strong>Search:</strong></label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Search by username or subject"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                            </div>
                        </div>
                        
                        <div className="table-responsive">
                            <table className="table table-bordered data-table">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>UserName</th>
                                        <th>Subject</th>
                                        <th>URL</th>
                                        <th>Method</th>
                                        <th>IP</th>
                                        <th>Created</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredLogs.map((log, index) => (
                                        <tr key={log.id}>
                                            <td>{index + 1}</td>
                                            <td>{log.username}</td>
                                            <td>{log.subject}</td>
                                            <td><a href={log.url} target="_blank" rel="noopener noreferrer">{log.url}</a></td>
                                            <td>{log.method}</td>
                                            <td>{log.ip}</td>
                                            <td>{log.created}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="dataTables_info" id="example_info" role="status" aria-live="polite">
                                Showing {filteredLogs.length} of {logData.length} entries
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LogActivities;
