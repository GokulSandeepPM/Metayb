const Bike = require('../models/Bike');
const Employee = require('../models/Employee');

// Fetch all unassembled bikes
exports.getUnassembledBikes = async (req, res) => {
  try {
    const bikes = await Bike.find({ underAssembly: false });
    res.json(bikes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Assign bike for assembly
exports.assignBike = async (req, res) => {
  const { bikeId } = req.body;
  try {
    const bike = await Bike.findById(bikeId);
    if (!bike || bike.underAssembly)
      return res.status(400).json({ message: 'Bike already under assembly or not found' });

    bike.underAssembly = true;
    bike.assembledBy = req.user.id;
    await bike.save();
    res.json({ message: 'Bike assigned for assembly' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mark bike as complete
exports.completeBike = async (req, res) => {
  const { bikeId,assemblyTime } = req.body;
  try {
    const bike = await Bike.findById(bikeId);
    if (!bike || !bike.underAssembly)
      return res.status(400).json({ message: 'Bike not under assembly or not found' });

    bike.underAssembly = false;
    bike.assemblyDate = new Date();
    bike.assemblyTime = assemblyTime;
    await bike.save();
    res.json({ message: 'Bike assembly completed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getBikeAssemblyStats = async (req, res) => {
  const { fromDate, toDate } = req.query;

  try {
    const bikes = await Bike.aggregate([
      {
        $match: {
          assemblyDate: { $gte: new Date(fromDate), $lte: new Date(toDate) },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$assemblyDate" } },
          totalAssembled: { $sum: 1 },
        },
      },
      {
        $sort: { "_id": 1 }, 
      }
    ]);
    res.json(bikes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bike assembly stats.' });
  }
};

// Fetch the production of each employee on a given day
exports.getEmployeeProduction = async (req, res) => {
  const { date } = req.query;

  try {
    const productionStats = await Bike.aggregate([
      {
        $match: {
          assemblyDate: { $gte: new Date(date), $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)) },
        },
      },
      {
        $group: {
          _id: "$assembledBy",
          totalAssembled: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'employees', 
          localField: '_id',
          foreignField: '_id',
          as: 'employee',
        },
      },
      {
        $unwind: "$employee",
      },
      {
        $project: {
          employeeName: { $concat: ["$employee.name"] },
          totalAssembled: 1,
        },
      },
    ]);

    res.json(productionStats);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching employee production stats.' });
  }
};

exports.getUnderAssemblyBike = async (req, res) => {
  try {
    const employeeId = req.user._id;
    const bike = await Bike.findOne({ employeeId, underAssembly: true });
    res.status(200).json(bike);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while fetching under-assembly bike.' });
  }
};