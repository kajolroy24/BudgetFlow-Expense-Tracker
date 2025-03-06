import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import DashboardNav from './DashboardNav';

const DashLayout = ({ children }) => {

    return (
        <div>
            <div className='fixed md:w-64 hidden md:block'>
                <Sidebar />
            </div>
            <div className='md:ml-64'>
                <DashboardNav />
                {children}
            </div>
        </div>

    );
};

export default DashLayout;