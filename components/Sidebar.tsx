import React, { useState, useEffect } from 'react';
import Chat from '../components/Chat';
import { useSelector } from 'react-redux';
import allUser from "../utils/allUser";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
const Sidebar = () => {
  const { users } = useSelector((state: any) => state.user);
  const [userData, setUserData] = useState([]);
  const [progress, setProgress] = React.useState(0);
  const [selectedUser, setSelectedUser] = useState(null);

  
  useEffect(() => {
    allUser().then((data) => {
      setUserData(data);
    }).catch((error) => {
      console.error("An error occurred:", error);
    });
  }, []);

  console.log(userData, "userData");


  const handleUserClick = (user: any) => {
    setSelectedUser(user);
  };

  return (
    <>
     <div className="sidebar">
      <div className="sidebar-users">
        {userData.length==0 &&  <CircularProgress disableShrink />}
        {userData && userData.map((user, index) => (
          <div className="user" key={index}>
            <div className="user-image">
              {/**@ts-ignore */}
              <img className="img"src={user.profilePic} alt={`${user.firstname} ${user.lastname}`} />
            </div>
            <div className="user-info">
              <button className="user-button" onClick={() => handleUserClick(user)}>
              {/**@ts-ignore */}
                <span>{user.firstname} {user.lastname}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

      <div className=''>
        {selectedUser && <Chat selectedUser={selectedUser} />}
      </div>
    </>
  );
};

export default Sidebar;
