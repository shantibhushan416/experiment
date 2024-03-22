import mongoose from 'mongoose';
import jwt from "jsonwebtoken";
import config from "config"

const secretKey = "privateKey";

const userSchema = new mongoose.Schema({
    name: {
        type: String,

    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    isAdmin: {
        type: Boolean
    }
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
    return token;
}

const user = mongoose.model("user", userSchema);



export function generateToken() {

}

export default user;