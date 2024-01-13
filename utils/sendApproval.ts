import axios from "axios"
import { toast } from 'react-toastify';
import getApproval from "./getApproval";
const sendApproval =async(token:any,receiver:string,status:string)=>{
    const approval=await axios.post("/api/user/requestChat",{receiver,status}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    getApproval(token)
    toast(approval.data.message, { hideProgressBar: true, autoClose: 2000, type: 'success' })
    return approval.data;

}
export default sendApproval;