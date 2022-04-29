const router = require("express").Router();

const UserController = require("../controllers/UserController");
const LicenseController = require("../controllers/LicenseController");
const PivotTableController = require("../controllers/PivotTableController");
const RolController = require("../controllers/RolController");
const AdminController = require("../controllers/AdminController");
const AdminRoleController = require("../controllers/AdminRoleController");

const CheckBalanceController = require("../controllers/CheckBalanceController");

//Metodos Get
router.get("/users", UserController.getUsers);
router.get("/users/:id", UserController.getUserById);
router.get("/user", UserController.searchUser);

router.get("/licenses", LicenseController.getLicenses);
router.get("/licenses/:id", LicenseController.getLicenseById);
router.get("/license", LicenseController.searchLicense);

router.get("/pivot", PivotTableController.getPivotTable);
router.get("/pivot/:id", PivotTableController.getPivotById);
router.get("/userrollic", PivotTableController.searchPivot);

router.get("/rols", RolController.getRols);

router.get("/admins/:id", AdminController.getAdminById);

router.get("/balance_bodega", CheckBalanceController.getBalanceByBodega);
router.get("/balance_codsaldo", CheckBalanceController.getBalanceByCodSaldo);
router.get("/balance_linea", CheckBalanceController.getBalanceByLinea);
router.get("/balance_producto", CheckBalanceController.getBalanceByNomProducto);
router.get("/balance_saldo", CheckBalanceController.getBalanceBySaldo);

//Metodos Post
router.post("/users/store", UserController.createUser);

router.post("/licenses/store", LicenseController.createLicense);
router.post("/pivot/store", PivotTableController.createPivot);

router.post("/admin_regiter_user", AdminRoleController.adminRegisterToUser);

//Metodos Put
router.put("/users/:id", UserController.updateUser);
router.put("/licenses/:id", LicenseController.updateLicense);
router.put("/pivot/:id", PivotTableController.updatePivot);

router.put("/admin/change_pass", AdminRoleController.changePasswordAdmin);
router.put("/admin/change_role", AdminRoleController.changeRoleToUser);

//Metodos Delete
router.delete("/users/:id", UserController.deleteUser);
router.delete("/users/desactive/:id", UserController.desactiveUser);

router.delete("/licenses/:id", LicenseController.deleteLicense);
router.delete("/license/desactive/:id", LicenseController.desactiveLicense);

router.delete("/pivot/:id", PivotTableController.deletePivot);

module.exports = router;
