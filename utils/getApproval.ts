import axios from "axios"

const getApproval =async(token:any)=>{
    const approval=await axios.get("/api/user/requestChat", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return approval.data;
    console.log(approval,"approval");

}
export default getApproval;