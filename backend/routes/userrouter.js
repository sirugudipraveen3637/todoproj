const Router = require("router");
const router = Router();
const createuser = require("../controllers/createDBUserController");
const login=require("../controllers/loginDBController");
const createawuser=require("../controllers/createappwriteUserController");
const loginaw=require("../controllers/loginappwriteUserController")

router.post("/v1/todo/createuser", createuser);
router.post("/v1/todo/createawuser", createawuser);
router.post("/v1/todo/login", login);
router.post("/v1/todo/loginaw", loginaw);

module.exports = router;
