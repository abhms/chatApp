import React, { useState } from 'react';
import Chat from '../components/Chat';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const { users } = useSelector((state: any) => state.user);

  const aa = [
    { name: "abc", img: "pppp" },
    { name: "abc1", img: "pppp1" },
    { name: "abc2", img: "pppp2" },
    { name: "abc3", img: "pppp3" }
  ];

  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserClick = (user:any) => {
    setSelectedUser(user);
  };

  return (
    <>
   
    <div className="sidebar">
      <div className="sidebar-users">
        {aa.map((user, index) => (
          <div className="user" key={index}>
            <div className="circle"></div>
            <div className="user-info">
              <button className="user-button" onClick={() => handleUserClick(user)}>
                <span>{user.name}</span>
                <img src={user.img} alt={user.name} />
              </button>
            </div>
          </div>
        ))}
      </div>
    
      
    </div>
    <div className=''>

      <Chat selectedUser={selectedUser}/>
    </div>
    </>
  );
};

export default Sidebar;
