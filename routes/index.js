var express = require('express');
var router = express.Router();

var userController = require('../controller/userController');
var accidentController = require('../controller/accidentController');
var suggestController = require('../controller/suggestController');
var speedController = require('../controller/speedController');
var stopController = require('../controller/stopController');
/* GET home page. */
router.get('/users',userController.findAll);
router.post('/users/login',userController.find);
router.put('/users',userController.editUser);
router.delete('/users/:id',userController.deleteUser);
router.delete('/users',userController.remove);
router.post('/users/register',userController.addUser);


router.get('/accidents',accidentController.findAll);
router.get('/accidents/:login',accidentController.find);
router.put('/accidents',accidentController.editUser);
router.delete('/accidents/:id',accidentController.deleteUser);
router.delete('/accidents',accidentController.remove);
router.post('/accidents',accidentController.addUser);

router.get('/speeds',speedController.findAll);
router.get('/speeds/:login',speedController.find);
router.put('/speeds',speedController.editUser);
router.delete('/speeds/:id',speedController.deleteUser);
router.delete('/speeds',speedController.remove);
router.post('/speeds',speedController.addUser);

router.get('/stops',stopController.findAll);
router.get('/stops/:login',stopController.find);
router.put('/stops',stopController.editUser);
router.delete('/stops/:id',stopController.deleteUser);
router.delete('/stops',stopController.remove);
router.post('/stops',stopController.addUser);

router.get('/suggests',suggestController.findAll);
router.get('/suggests/:types',suggestController.find);
router.put('/suggests',suggestController.editUser);
router.delete('/suggests/:id',suggestController.deleteUser);
router.delete('/suggests',suggestController.remove);
router.post('/suggests',suggestController.addUser);

module.exports = router;
