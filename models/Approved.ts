import mongoose from "./db";

const ApprovedSchema = new mongoose.Schema({
    sender: String,
    receiver: String,
    status: {
        type: String,
        default: "Not send"
    },
},
    {
        timestamps: true,
    });

const Approved = mongoose.models.Approveds || mongoose.model("Approveds", ApprovedSchema);

export default Approved;
