import mongoose from "mongoose";
const todoSchema = new mongoose.Schema({
    
})
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
    dueDate: {
      type: Date,
      required: true,
    },
    assignedTo: [
      {
        // This creates a reference (relation) to another document in MongoDB.
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    createdBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    attachements: [{
        type:String,

    }],
    todoCheckList:[todoSchema],
    progress:{type:number,default:0}
},
  { timestamps: true },
);
const Task = mongoose.model("Task", taskSchema);
export default Task;
