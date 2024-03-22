import Branch from "../model/branchSchema.js";

export async function postBranch(req, res) {
    try {
        const branch = new Branch(req.body);
        console.log(branch);
        await branch.save();
        return res.status(200).json("Branch saved successfully");
    } catch (error) {
        console.log(error.message);
    }
}

export async function getBranch(req, res) {
    try {
        const branch = await Branch.find({});
        return res.status(200).json(branch);
    } catch (error) {
        console.log(error.message);
    }
}

export async function updateBranchbyId(req, res) {
    try {
        const branch = await Branch.findByIdAndUpdate(req.params.id, { name: req.body.name });

        return res.status(200).json({ message: "Branch updated successfully", branch });
    } catch (error) {
        console.log(error.message);
    }
}