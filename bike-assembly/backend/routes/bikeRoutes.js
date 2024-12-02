const express = require('express');
const { getUnassembledBikes, assignBike, completeBike, getBikeAssemblyStats, getEmployeeProduction,getUnderAssemblyBike } = require('../controllers/bikeController');
const authMiddleWare  = require('../middlewares/auth');
const router = express.Router();

// Bike Routes
router.get('/unassembled', authMiddleWare, getUnassembledBikes);
router.post('/assign', authMiddleWare, assignBike);
router.post('/complete', authMiddleWare, completeBike);
router.get('/under-assembly', authMiddleWare, getUnderAssemblyBike);

// Admin dashboard chart data routes
router.get('/assembly-stats', authMiddleWare, getBikeAssemblyStats);  
router.get('/employee-production', authMiddleWare, getEmployeeProduction); 

module.exports = router;
