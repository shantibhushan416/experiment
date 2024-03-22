import mongoose from 'mongoose';

const branchSchema = new mongoose.Schema({
    name: {
        type: String,
    }
});


const branch = mongoose.model("branch", branchSchema);
export default branch;