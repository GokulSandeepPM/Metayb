require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Employee = require('../models/Employee');
const Bike = require('../models/Bike');

const seedDB = async () => {
  await mongoose.connect(process.env.DB_URI);
  console.log("Database connected");

  // Clear existing data
  await Employee.deleteMany({});
  await Bike.deleteMany({});

  // Hash passwords
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Seed employees
  const employees = [
    { name: 'Admin', role: 'admin', email: 'admin@bikeassembly.com', password: await bcrypt.hash('admin123', 10) },
    { name: 'Emp-1', role: 'employee', email: 'emp1@bikeassembly.com', password: hashedPassword },
    { name: 'Emp-2', role: 'employee', email: 'emp2@bikeassembly.com', password: hashedPassword },
    { name: 'Emp-3', role: 'employee', email: 'emp3@bikeassembly.com', password: hashedPassword },
    { name: 'Emp-4', role: 'employee', email: 'emp4@bikeassembly.com', password: hashedPassword },
    { name: 'Emp-5', role: 'employee', email: 'emp5@bikeassembly.com', password: hashedPassword },
  ];

  const savedEmployees = await Employee.insertMany(employees);

  // Seed bikes with historical data
  const bikes = [
    // Assembled bikes
    {
      bikeType: 'Bike 1',
      assemblyTime: '50 minutes',
      assembledBy: savedEmployees[1]._id,
      assemblyDate: new Date('2024-12-01T10:00:00'),
      underAssembly: false,
    },
    {
      bikeType: 'Bike 2',
      assemblyTime: '1 hour',
      assembledBy: savedEmployees[2]._id,
      assemblyDate: new Date('2024-12-01T11:30:00'),
      underAssembly: false,
    },
    {
      bikeType: 'Bike 3',
      assemblyTime: '1 hour 20 minutes',
      assembledBy: savedEmployees[3]._id,
      assemblyDate: new Date('2024-12-02T09:00:00'),
      underAssembly: false,
    },
    {
      bikeType: 'Bike 4',
      assemblyTime: '50 minutes',
      assembledBy: savedEmployees[3]._id,
      assemblyDate: new Date('2024-12-01T10:00:00'),
      underAssembly: false,
    },
    {
      bikeType: 'Bike 5',
      assemblyTime: '1 hour',
      assembledBy: savedEmployees[1]._id,
      assemblyDate: new Date('2024-12-01T11:30:00'),
      underAssembly: false,
    },
    {
      bikeType: 'Bike 6',
      assemblyTime: '1 hour 20 minutes',
      assembledBy: savedEmployees[2]._id,
      assemblyDate: new Date('2024-12-02T09:00:00'),
      underAssembly: false,
    },
    {
      bikeType: 'Bike 7',
      assemblyTime: '50 minutes',
      assembledBy: savedEmployees[4]._id,
      assemblyDate: new Date('2024-12-01T10:00:00'),
      underAssembly: false,
    },
    {
      bikeType: 'Bike 8',
      assemblyTime: '1 hour',
      assembledBy: savedEmployees[4]._id,
      assemblyDate: new Date('2024-12-01T11:30:00'),
      underAssembly: false,
    },
    {
      bikeType: 'Bike 9',
      assemblyTime: '1 hour 20 minutes',
      assembledBy: savedEmployees[3]._id,
      assemblyDate: new Date('2024-12-02T09:00:00'),
      underAssembly: false,
    },
    {
      bikeType: 'Bike 10',
      assemblyTime: '50 minutes',
      assembledBy: savedEmployees[5]._id,
      assemblyDate: new Date('2024-12-01T10:00:00'),
      underAssembly: false,
    },
    {
      bikeType: 'Bike 11',
      assemblyTime: '1 hour',
      assembledBy: savedEmployees[5]._id,
      assemblyDate: new Date('2024-12-01T11:30:00'),
      underAssembly: false,
    },
    {
      bikeType: 'Bike 12',
      assemblyTime: '1 hour 20 minutes',
      assembledBy: savedEmployees[5]._id,
      assemblyDate: new Date('2024-12-02T09:00:00'),
      underAssembly: false,
    },
    // Unassembled bikes
    { bikeType: 'Bike 13', underAssembly: false },
    { bikeType: 'Bike 14', underAssembly: false },
    { bikeType: 'Bike 15', underAssembly: false },
    { bikeType: 'Bike 16', underAssembly: false },
    { bikeType: 'Bike 17', underAssembly: false },
    { bikeType: 'Bike 18', underAssembly: false }
  ];

  await Bike.insertMany(bikes);

  console.log('Seeding complete!');
  mongoose.disconnect();
};

seedDB();
