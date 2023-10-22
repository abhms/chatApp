// import React, { useState, useEffect } from 'react';
// import Chat from '../components/Chat';
// import { useSelector, useDispatch } from 'react-redux';
// import allUser from '../utils/allUser';
// import CircularProgress from '@mui/material/CircularProgress';
// import getApproval from '@/utils/getApproval';
// import { setAooroved } from '../redux/slices/approved';

// type User = {
//   firstname: string;
//   lastname: string;
//   profilePic: string;
//   // Add other properties as needed
// };

// const Sidebar = () => {
//   const dispatch = useDispatch();
//   const { users } = useSelector((state: any) => state.user);
//   const [userData, setUserData] = useState<User[]>([]);
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [searchQuery, setSearchQuery] = useState<string>('');
//   const [filteredUsers, setFilteredUsers] = useState<User[]>(userData);

//   const handleSearch = () => {
//     if (searchQuery === '') {
//       setFilteredUsers(userData); // Reset to all users when search is empty
//     } else {
//       const filtered = userData.filter((user) => {
//         const fullName = `${user.firstname} ${user.lastname}`;
//         return fullName.toLowerCase().includes(searchQuery.toLowerCase());
//       });

//       setFilteredUsers(filtered);
//     }
//   };

//   useEffect(() => {
//     allUser()
//       .then((data) => {
//         setUserData(data);
//         setFilteredUsers(data); 
//       })
//       .catch((error) => {
//         console.error("An error occurred:", error);
//       });
//   }, []);

//   useEffect(() => {
//     const token = localStorage.getItem('token');

//     const getApprovalData = async () => {
//       const approvalData = await getApproval(token);
//       console.log(approvalData, "approvalData");
//       dispatch(setAooroved(approvalData));
//     };

//     getApprovalData();
//   }, [dispatch]);

//   const handleUserClick = (user: User) => {
//     setSelectedUser(user);
//   };

//   return (
//     <>
//       <div className="sidebar">
//         <input
//           className="searchbox"
//           placeholder="Search..."
//           value={searchQuery}
//           onChange={(e) => {
//             setSearchQuery(e.target.value), handleSearch();
//           }}
//           onKeyUp={(e) => {
//             if (e.key === 'Enter') {
//               handleSearch();
//             }
//           }}
//         />
//       </div>
//       <div className="sidebar">
//         <div className="sidebar-users">
//           {userData.length === 0 ? (
//             <CircularProgress disableShrink />
//           ) : (
//             filteredUsers.map((user, index) => (
//               <div className="user" key={index} onClick={() => handleUserClick(user)}>
//                 <div className="user-image">
//                   <img
//                     className="img"
//                     src={user.profilePic}
//                     alt={`${user.firstname} ${user.lastname}`}
//                   />
//                 </div>
//                 <div className="user-info">
//                   <button className="user-button" onClick={() => handleUserClick(user)}>
//                     <span>
//                       {user.firstname} {user.lastname}
//                     </span>
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       <div className="">
//         {selectedUser && <Chat selectedUser={selectedUser} />}
//       </div>
//     </>
//   );
// };

// export default Sidebar;


import React, { useState, useEffect } from 'react';
import Chat from '../components/Chat';
import { useSelector, useDispatch } from 'react-redux';
import allUser from '../utils/allUser';
import CircularProgress from '@mui/material/CircularProgress';
import getApproval from '@/utils/getApproval';
import { setAooroved } from '../redux/slices/approved';

type User = {
  firstname: string;
  lastname: string;
  profilePic: string;
  // Add other properties as needed
};

const Sidebar = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state: any) => state.user);
  const [userData, setUserData] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>(userData);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (query === '') {
      setFilteredUsers(userData); // Reset to all users when search is empty
      setNotFound(false); // Clear "Not Found" message
    } else {
      const filtered = userData.filter((user) => {
        const fullName = `${user.firstname} ${user.lastname}`;
        return fullName.toLowerCase().includes(query.toLowerCase());
      });

      setFilteredUsers(filtered);

      if (filtered.length === 0) {
        setNotFound(true);
      } else {
        setNotFound(false);
      }
    }
  };

  useEffect(() => {
    allUser()
      .then((data) => {
        setUserData(data);
        setFilteredUsers(data); // Display all users by default
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const getApprovalData = async () => {
      const approvalData = await getApproval(token);
      console.log(approvalData, "approvalData");
      dispatch(setAooroved(approvalData));
    };

    getApprovalData();
  }, [dispatch]);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  return (
    <>
      <div className="sidebar">
        <input
          className="searchbox"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => {
            handleSearch(e.target.value); // Trigger search onChange
          }}
        />
      </div>
      <div className="sidebar">
        <div className="sidebar-users">
          {userData.length === 0 ? (
            <CircularProgress disableShrink />
          ) : notFound ? (
            <p style={{color:"black"}}>No users found.</p>
          ) : (
            filteredUsers.map((user, index) => (
              <div className="user" key={index} onClick={() => handleUserClick(user)}>
                <div className="user-image">
                  <img
                    className="img"
                    src={user.profilePic}
                    alt={`${user.firstname} ${user.lastname}`}
                  />
                </div>
                <div className="user-info">
                  <button className="user-button" onClick={() => handleUserClick(user)}>
                    <span>
                      {user.firstname} {user.lastname}
                    </span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="">
        {selectedUser && <Chat selectedUser={selectedUser} />}
      </div>
    </>
  );
};

export default Sidebar;


