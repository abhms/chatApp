import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
const Profile = ({ setPro }: { setPro: any }) => {
  const { users } = useSelector((state: any) => state.user);
  
  return (
    <div className="user-profile">
      <FontAwesomeIcon icon={faArrowLeft} size="2x" className="arrow-icon" onClick={() => setPro(false)} style={{cursor:"pointer"}} />
      <h1 className='profiletext'>Profile</h1>
      
      <div className="user-avatar">
        <img src={users.profilePic} alt="User Avatar" />
      </div>
      <div className="user-details">
        <h1 className="user-name">Name: {users.firstname} {users.lastname}</h1>
        <p className="user-email">Email: {users.email}</p>
      </div>
      <div className='saveButton'>

      <Stack spacing={2} direction="row">
      <Button variant="contained" className='saveButton'>Save</Button>
    </Stack>
      </div>
    </div>
  );
};

export default Profile;
