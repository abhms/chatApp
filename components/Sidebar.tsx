import React, { useState } from 'react';
import Chat from '../components/Chat';

const Sidebar = () => {
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
      {selectedUser && (
        <div className="selected-user-info">
          <h3>Selected User:</h3>
         {/**@ts-ignore */}
          <p>Name: {selectedUser.name}</p>
         {/**@ts-ignore */}
          <p>Image: {selectedUser.img}</p>
        </div>
      )}
      <div className='chat-container'>
      <Chat/>
      </div>
    </div>
  );
};

export default Sidebar;
