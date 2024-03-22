import mongoose from "mongoose";
// import Branch from "./branchSchema.js";

const courseSchema = new mongoose.Schema({
    course: {
        type: String,
        required: true
    },
    author: {
        type: String,
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId, // Reference type
        ref: "branch"
        // type: Branch.schema, {--- If you want to change to hybrid type then you can use the this type}
    }

}, { timestamps: true });


const course = mongoose.model("course1", courseSchema);

export default course;