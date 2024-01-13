import { useState, useEffect, useRef } from 'react';
import Sidebar from '../../components/Sidebar';
import Profile from '@/components/Profile';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import axios from 'axios';
import { setUsers } from '../../redux/slices/user';
import { store } from "../../redux/store";
import showAlert from '../../utils/swal';
import { useSelector } from 'react-redux';
import { io, Socket } from 'socket.io-client';
const Chat: React.FC = () => {
  const { users } = useSelector((state: any) => state.user);
  const [pro, setPro] = useState(false);
  const [orginalToken, setOrginalToken] = useState<string | null>(null);
  const [seller, setseller] = useState(false);
  const [search, setSearch] = useState("");
  const socket = useRef();
  const router = useRouter();
    const localToken = localStorage.getItem('token');
    var token = localStorage.getItem('token'); 
  if (!token) {
    showAlert({
      title: 'Oops...',
      text: 'You are not login',
    });
    router.push("/")
  }  
  // useEffect(() => {
  //   const socket: Socket = io("http://localhost:3001"); 

  //   socket.on('connect', () => {
  //     console.log('Connected to chat server');
  //   });

  //   socket.on('message', (message: string) => {
  //    console.log(message,"backend message");
  //   });
  //   socket.emit('chat message', 'Hello, Server!');
  
  //   // Listen for messages from the server
  //   socket.on('chat_message', (msg) => {
  //     console.log('Received: ' + msg);
  //   });
  //   socket.on('disconnect', () => {
  //     console.log('Disconnected from chat server');
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);
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
            <button className='round-image-chat-button'>
            <img src={users?.profilePic} alt="User Avatar" className='round-image-chat' onClick={renderProfile} style={{ cursor: "pointer" }} />
            <h3 className='round-image-chat'>{users?.firstname}{users?.lastname}</h3>
            </button>
            {pro ? <Profile setPro={setPro}/> : <Sidebar />}
            {/* <Chat/> */}
        </div>
    );
};

export default Chat;