import express from "express"
import { userLogin, userRegister } from "../../Controllers/User/userController.js";

const router = express.Router();

router.route('/register').post(userRegister);
router.route('/login').post(userLogin);
// router.route("/logout").get(logout);

export default router;