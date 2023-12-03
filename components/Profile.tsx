import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";
import { setUsers } from "../redux/slices/user";
import showAlert from "../utils/swal";
import { useDispatch } from "react-redux";
import editUser from "../utils/editUser";
import { store } from "../redux/store";
const Profile = ({ setPro }: { setPro: any }) => {
  const { users } = useSelector((state: any) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [userData, setUserData] = useState(users);

  if (!token) {
    showAlert({
      title: "Oops...",
      text: "You are not logged in",
    });
    router.push("/");
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
    dispatch(setUsers(""));
  };

  const editUserData = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setUserData({
      ...userData,
      [field]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios("/api/hello");
        console.log(response.data, "zzz");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleEdit = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const newUser = await editUser(token, userData);
      store.dispatch(setUsers({ newUser }));
    }
  };
  return (
    <div className="user-profile">
      <FontAwesomeIcon
        icon={faArrowLeft}
        size="2x"
        className="arrow-icon"
        onClick={() => setPro(false)}
        style={{ cursor: "pointer" }}
      />
      <h1 className="profiletext">Profile</h1>

      <div className="user-avatar">
        <img src={users?.profilePic} alt="User Avatar" />
      </div>
      <div className="user-details">
        <input
          type="text"
          value={userData?.firstname}
          onChange={(e) => editUserData(e, "firstname")}
          className="user-input"
        />
        <input
          type="text"
          value={userData?.lastname}
          onChange={(e) => editUserData(e, "lastname")}
          className="user-input"
        />
        <input
          type="email"
          value={userData?.email}
          onChange={(e) => editUserData(e, "email")}
          className="user-input"
        />
      </div>
      <div className="saveButton">
        <Stack spacing={2} direction="row">
          <Button
            variant="contained"
            className="saveButton"
            onClick={handleEdit}
          >
            Edit
          </Button>
        </Stack>
        <Tooltip title="Logout">
          <IconButton>
            <FontAwesomeIcon
              icon={faSignOutAlt}
              color="black"
              size="2x"
              onClick={handleLogout}
            />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default Profile;
