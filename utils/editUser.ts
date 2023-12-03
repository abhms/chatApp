import axios from "axios";

const editUser=async(token:String,userData:any)=>{
    try {
        const response = await axios.post('/api/user/getUser',userData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const users = response.data.user
        return users
        console.log(users);
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}
export default editUser
