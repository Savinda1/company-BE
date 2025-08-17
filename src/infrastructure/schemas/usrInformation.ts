import mongoose from "mongoose";

const UserInformationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  RgNO: {
    type: Number, 
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
 
 
});

const UserInformation = mongoose.model("UserInformation", UserInformationSchema);
export default UserInformation;