import React from 'react';

function Card({ title, value, icon, link }) {
    return (
        <div className="col-lg-3 col-md-3 col-sm-3 grid-margin stretch-card">
            <div className="card card-outline-primary">
                <a href={link}>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-8">
                                <h6 className="card-title mb-1">{title}</h6>
                                <h3 className="mb-1">{value}</h3>
                            </div>
                            <div className="col-md-4 mt-1">
                                <h1 className="text-right mr-3">
                                    <i data-feather={icon}></i>
                                </h1>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    );
}

export default Card;
