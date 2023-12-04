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
import UploadImg from "../utils/uploadImg";
const Profile = ({ setPro }: { setPro: any }) => {
  const { users } = useSelector((state: any) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [userData, setUserData] = useState(users);
  const [image, setImage] = useState<File | null>(null);
  const [imageTimestamp, setImageTimestamp] = useState<number>(Date.now());
  const [isHovered, setIsHovered] = useState(false);
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);
    }
  };

  const handleEdit = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        var imageUrl;

        const formData1 = new FormData();
        //@ts-ignore
        formData1.append("file", image);
        formData1.append("upload_preset", "my-uploads");
        if (image) {
          imageUrl = await UploadImg(formData1);
        }

        const userDataToUpdate = {
          firstname: userData.firstname,
          lastname: userData.lastname,
          email: userData.email,
          profilePic: imageUrl,
        };
        const newUser = await editUser(token, userDataToUpdate);
        store.dispatch(setUsers({ newUser }));
        setImageTimestamp(Date.now());
      } catch (error) {
        console.error("Error editing user:", error);
      }
    }
  };
  console.log(imageTimestamp, "imageTimestamp");
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

      <div
        className="user-avatar"
        onClick={() => document.getElementById("imageInput")?.click()}
        onMouseEnter={() => setIsHovered(true)} // Set isHovered to true on hover
        onMouseLeave={() => setIsHovered(false)} // Set isHovered to false on leave
        style={{ cursor: "pointer" }}
      >
        <img
          src={
            image
              ? URL.createObjectURL(image)
              : `${users?.profilePic}?t=${imageTimestamp}`
          }
          alt="User Avatar"
        />
        {isHovered && (
          <div className="change-photo-text">Change Profile Photo</div>
        )}
        <input
          type="file"
          accept="image/*"
          id="imageInput"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
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
