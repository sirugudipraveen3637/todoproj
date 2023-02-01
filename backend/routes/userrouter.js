const Router = require("router");
const router = Router();
const createuser = require("../controllers/createDBUserController");
const login=require("../controllers/loginDBController");
const createawuser=require("../controllers/createappwriteUserController");
const loginaw=require("../controllers/loginappwriteUserController")
const pwdReset=require("../controllers/createPasswordResetLinkController")
const resetPassword=require("../controllers/resetPasswordController")

router.post("/v1/todo/createuser", createuser);
router.post("/v1/todo/createawuser", createawuser);
router.post("/v1/todo/login", login);
router.post("/v1/todo/loginaw", loginaw);
router.post("/v1/todo/forgotPassword", pwdReset);
router.post("/v1/todo/resetPassword/:forgottoken", resetPassword);

module.exports = router;
