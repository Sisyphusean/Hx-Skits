//React
import React from 'react';

//Components
import Navbar from '../components/Navbar';

export default function Home() {
    return (
        <div className="container px-4 lg:px-32 md:px-16">
            <Navbar userType='admin'/>
            <div className='container'>
                {/* <p>This is the Home page</p> */}
            </div>
        </div>
    )
}