const router = require("express").Router();

const LoginController = require("../controllers/LoginController");

router.post("/login", LoginController.login);
router.post("/register", LoginController.register);

module.exports = router;