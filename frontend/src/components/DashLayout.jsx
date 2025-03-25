import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import DashboardNav from './DashboardNav';

const DashLayout = ({ children }) => {

    return (

        // <div className="relative min-h-screen">
        //     <div className="bg-white fixed top-0 left-0 w-full z-50">
        //         <DashboardNav />
        //     </div>

        //     <div className='fixed top-19 left-0 md:w-64 z-40 hidden md:block'>
        //         <Sidebar />
        //     </div>

        //     <div className="md:ml-64 mt-19 z-30 bg-purple-50 min-h-screen">
        //         {children}
        //     </div>
        // </div>

        <div>
            <div className='fixed md:w-64 hidden md:block'>
                <Sidebar />
            </div>
            <div className='md:ml-64'>
                <DashboardNav />
                <div className="bg-purple-50 min-h-screen">
                {children}
                </div>
            </div>
        </div>



    );
};

export default DashLayout;