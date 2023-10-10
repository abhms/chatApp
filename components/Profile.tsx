import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { setUsers } from '../redux/slices/user';
import showAlert from '../utils/swal';
import { useDispatch } from 'react-redux';
const Profile = ({ setPro }: { setPro: any }) => {
  const { users } = useSelector((state: any) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();
  var token = localStorage.getItem('token'); 
  if (!token) {
    showAlert({
      title: 'Oops...',
      text: 'You are not login',
    });
    router.push("/")
  }
  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(setUsers(""));
    router.push('/');
  };
  return (
    <div className="user-profile">
      <FontAwesomeIcon icon={faArrowLeft} size="2x" className="arrow-icon" onClick={() => setPro(false)} style={{ cursor: "pointer" }} />
      <h1 className='profiletext'>Profile</h1>

      <div className="user-avatar">
        <img src={users?.profilePic} alt="User Avatar" />
      </div>
      <div className="user-details">
        <h1 className="user-name">Name: {users?.firstname} {users?.lastname}</h1>
        <p className="user-email">Email: {users?.email}</p>
      </div>
      <div className='saveButton'>

        <Stack spacing={2} direction="row">
          <Button variant="contained" className='saveButton'>Save</Button>
        </Stack>
        <Tooltip title="Logout">
          <IconButton>
            <FontAwesomeIcon icon={faSignOutAlt} color='black' size='2x' onClick={handleLogout}/>
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default Profile;
