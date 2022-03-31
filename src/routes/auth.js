const router = require("express").Router();

const LoginController = require("../controllers/LoginController");
const UserLoginController = require("../controllers/UserLoginController");

router.post("/login", LoginController.login);
router.post("/register", LoginController.register);
router.post("/user_login", UserLoginController.login);

module.exports = router;
