import axios from "axios"

const allUser=async()=>{
    const userData=await axios.get("/api/user/getAllUser");
    return userData.data.allUser;
}

export default allUser