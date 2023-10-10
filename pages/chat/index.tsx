import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Profile from '@/components/Profile';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import axios from 'axios';
import { setUsers } from '../../redux/slices/user';
import { store } from "../../redux/store";
import showAlert from '../../utils/swal';
import { useSelector } from 'react-redux';

const chat = () => {
    const { users } = useSelector((state: any) => state.user);
    const [pro, setPro] = useState(false)
    const [orginalToken, setOrginalToken] = useState<string | null>(null);
    const [seller, setseller] = useState(false)
    const [search, setSearch] = useState("")
    const router = useRouter();
    const localToken = localStorage.getItem('token');
    console.log(localToken, "token");
    var token = localStorage.getItem('token'); 
  if (!token) {
    showAlert({
      title: 'Oops...',
      text: 'You are not login',
    });
    router.push("/")
  }
    useEffect(() => {
        const fetchData = async () => {
            if (typeof window !== 'undefined') {
                const token = localStorage.getItem('token');
                setOrginalToken(token);

                if (token) {
                    try {
                        const response = await axios.get('/api/user/getUser', {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        });
                        const users = response.data.user
                        setseller(response.data.user.seller)
                        store.dispatch(setUsers({ users }))
                        console.log(users);
                    } catch (error) {
                        console.error('Error fetching user data:', error);
                    }
                }
            }
        };

        fetchData();
    }, []);
    const renderProfile = () => {
        if (pro) {
            setPro(false)
        } else {
            setPro(true)
        }
    }
    return (
        <div>
            <Button onClick={renderProfile} className='round-image-chat-button'>
            <img src={users?.profilePic} alt="User Avatar" className='round-image-chat'/>
            </Button>
            {pro ? <Profile setPro={setPro}/> : <Sidebar />}
        </div>
    );
};

export default chat;