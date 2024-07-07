import React from 'react';
import "./ProfileScreen.css";
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';




const Setting = () => {

    const user = localStorage.getItem('userEmail');

  return (
    <div className='profileScreen'>
     <Navbar/>
     <div className="profileScreen_body">
        <h1>Edit Profile</h1>
        <div className="profileScreen_info">
            <img src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-88wkdmjrorckekha.jpg" alt="profile" />
            <div className="profileScreen_details">
                <h2>{user}</h2>
                <div className="profileScreen_plans">
                    <h3>Plans</h3>
                    <div className='monthly'>
                        <div>
                        <h4>Monthy Subscription</h4>
                        Rs 299

                        </div>
                       
                        <button className='active'>Activate</button>

                    </div>
                    
                </div>
            </div>
        </div>
     </div>
      
    </div>
  )
}

export default Setting
