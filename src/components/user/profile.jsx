import Navbar from '../navbar';

import './profile.css'

import axios from 'axios';

import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../authContext';

const API_URL = 'https://abcd1234.ngrok.io';

const Profile = () => {

  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({ username: "" });

  const { setUser } = useAuth();

  useEffect(() => {

    const fetchUserDetails = async () => {

      const userId = localStorage.getItem('userId');

      if (userId) {

        try {

          const res = await axios.get(`${API_URL}/userProfile/${userId}`);

          setUserDetails(res.data);

        } catch (error) {

          console.log('Error in fecthing the details:', error.message);

        }

      }

    };

    fetchUserDetails();

  }, []);

  return (

    <>

      <Navbar />

      <div className='overview'>

        <p id='first' onClick={() => console.log('hello')}>Overview</p>

        <p id='second'>Starred Repositories</p>

      </div>

      <button style={{ position: "relative", bottom: "40px", left: '1400px' }} id='logout'

        onClick={() => {

          localStorage.removeItem('token');

          localStorage.removeItem('userId');

          setUser(null);

          window.location.href = '/auth';
        }}
      >

        Logout

      </button>

      <div className="profile-page-wrapper">

        <div className="user-profile-section">

          <div className="profile-image">

          </div>

          <div className="name">

            <h3 style={{ color: 'black', textAlign: "center" }}>

              {userDetails.username}

            </h3>

          </div>

          <button className="follow-btn">Follow</button>

          <div className="follower">

            <p>10 Follower</p>

            <p>3 Following</p>

          </div>

        </div>

        <div className="heat-map-section">

        </div>

      </div>

    </>

  )

}

export default Profile;
