import { users } from "../models/users.js";
import bcrypt from "bcrypt";
import {connectDB} from "../data/database.js";
connectDB();
const user = new users({
    name: "test",
    username: "test",
    password: bcrypt.hashSync("test", 10)
});

user.save().then((user) => {
    console.log(user);
})