import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//  RgNO: {
//     type: Number, 
//     required: true,
//   },
//   department: {
//     type: String,
//     required: true,
//   },
 RgNO: {
    type: Number, 
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },

  timeIn: {
    type: Number, 
    required: true,
  },

  timeOut: {
    type: Number,
    required: true,
  },

  totalTime: {
    type: Number,
    required: true,
  },

  
}, );

const Attendance = mongoose.model("Attendance", AttendanceSchema);

export default Attendance;
