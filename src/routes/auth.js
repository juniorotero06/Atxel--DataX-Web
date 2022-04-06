const router = require("express").Router();

const LoginController = require("../controllers/LoginController");
const UserLoginController = require("../controllers/UserLoginController");
const UserRegisterController = require("../controllers/UserRegisterController");

router.post("/login", LoginController.login);
router.post("/register", LoginController.register);
router.post("/user_login", UserLoginController.login);
router.post("/regiter_data", UserRegisterController.regiterEmail);
router.post("/license_data", UserRegisterController.licenseEmail);

module.exports = router;
