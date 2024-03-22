import User from "../model/userSchema.js";
import bcrypt from "bcrypt";

export async function authUser(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send("Invalid email");

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) return res.status(400).send("Invalid password");


        const token = user.generateAuthToken();


        return res.send(token);;
    } catch (error) {
        console.log(error.message);
    }
};