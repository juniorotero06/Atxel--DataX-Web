const router = require('express').Router();

const UserController = require('../controllers/UserController');
const LicenseController = require('../controllers/LicenseController');
const PivotTableController = require('../controllers/PivotTableController');
const RolController = require('../controllers/RolController');

router.get('/users', UserController.getUsers);
router.get('/licenses', LicenseController.getLicenses);
router.get('/pivot', PivotTableController.getPivotTable);
router.get('/rols', RolController.getRols);

router.post('/users/store', UserController.createUser);
router.post('/licenses/store', LicenseController.createLicense);

module.exports = router;