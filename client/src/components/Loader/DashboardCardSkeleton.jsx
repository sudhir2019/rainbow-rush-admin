import React from 'react';

const DashboardCardSkeleton = () => {
    return (
        <div className="animate-pulse border border-gray-200 rounded-lg p-6 shadow-md">
            {/* Card Header */}
            <div className="h-6 bg-gray-300 rounded w-3/4"></div>

            {/* Card Body */}
            <div className="mt-4 space-y-4">
                <div className="h-8 bg-gray-300 rounded w-5/6"></div>
                <div className="h-6 bg-gray-300 rounded w-4/5"></div>
                <div className="h-6 bg-gray-300 rounded w-2/3"></div>
            </div>

            {/* Card Footer */}
            <div className="mt-4 h-4 bg-gray-300 rounded w-1/4"></div>
        </div>
    );
};

export default DashboardCardSkeleton;
