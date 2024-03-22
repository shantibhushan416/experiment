import User from "../model/userSchema.js";
import _ from "lodash";
import bcrypt from "bcrypt";




export async function postUser(req, res) {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send('User already registered.');

        user = new User(_.pick(req.body, ['name', 'email', 'password', 'isAdmin']));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();

        const token = user.generateAuthToken();
        res.header('Shanti', token).send(_.pick(user, ['_id', 'name', 'email']));

    } catch (error) {
        console.log("Invalid token");
    }
};


export async function getProfile(req, res) {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) return res.status(400).send('not Found.');
        res.send(user)
    } catch (error) {

    }
}

// export async function postUser(req, res) {
//     try {
//         let user = await User.findOne({ email: req.body.email });
//         if (user) return res.status(400).send('User already registered.');

//         user = new User(_.pick(req.body, ['name', 'email', 'password']));
//         console.log(user);
//         const salt = await bcrypt.genSalt(10);
//         user.password = await bcrypt.hash(user.password, salt);
//         await user.save();

//         const token = user.generateAuthToken();
//         res.header('', token).send(_.pick(user, ['_id', 'name', 'email']));

//     } catch (error) {
//         console.log(error.message);
//     }
// } 