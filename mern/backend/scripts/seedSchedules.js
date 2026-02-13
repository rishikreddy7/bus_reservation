#!/usr/bin/env node
require('dotenv').config();
const mongoose = require('mongoose');
const Bus = require('../models/Bus');
const Route = require('../models/Route');
const Schedule = require('../models/Schedule');

async function main() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bus_reservation');
  console.log('MongoDB connected for seeding');

  // Define a set of popular Indian routes (source, destination, travelTime minutes)
  const routePairs = [
    ['Mumbai', 'Pune', 180],
    ['Mumbai', 'Ahmedabad', 600],
    ['Delhi', 'Jaipur', 270],
    ['Bangalore', 'Chennai', 360],
    ['Hyderabad', 'Bangalore', 300],
    ['Kolkata', 'Delhi', 1440],
    ['Pune', 'Goa', 300],
    ['Lucknow', 'Varanasi', 240]
  ];

  const routes = [];
  for (const [src, dst, travelTime] of routePairs) {
    let route = await Route.findOne({ source: src, destination: dst });
    if (!route) {
      route = await Route.create({ source: src, destination: dst, travelTime });
      console.log('Created route', `${src} -> ${dst}`);
    }
    routes.push(route);
  }

  // Ensure a pool of buses exists
  const desiredBusCount = 30;
  let buses = await Bus.find();
  if (buses.length < desiredBusCount) {
    const types = ['Deluxe', 'Sleeper', 'Standard'];
    const toCreate = desiredBusCount - buses.length;
    const created = [];
    for (let i = 0; i < toCreate; i++) {
      const busNumber = `IND-${Math.floor(1000 + Math.random() * 9000)}`;
      const totalSeats = [36, 40, 44, 48, 50][Math.floor(Math.random() * 5)];
      const busType = types[Math.floor(Math.random() * types.length)];
      const b = await Bus.create({ busNumber, totalSeats, busType });
      created.push(b);
    }
    buses = buses.concat(created);
    console.log(`Created ${created.length} buses`);
  }

  // Create schedules: next N days, 2-3 buses per route per day
  const days = 14; // create schedules for next 14 days
  const perDayMin = 2;
  const perDayMax = 3;
  const baseTimes = ['06:00', '08:30', '11:00', '13:30', '16:00', '18:30', '21:00'];

  let createdSchedules = 0;
  for (const route of routes) {
    for (let d = 0; d < days; d++) {
      const date = new Date();
      date.setDate(date.getDate() + d);
      date.setHours(0, 0, 0, 0);

      const n = perDayMin + Math.floor(Math.random() * (perDayMax - perDayMin + 1));
      const times = shuffleArray(baseTimes).slice(0, n);

      for (const dep of times) {
        const bus = buses[Math.floor(Math.random() * buses.length)];
        const arr = addMinutesToTimeString(dep, route.travelTime);

        const exists = await Schedule.findOne({
          busId: bus._id,
          routeId: route._id,
          dateOfJourney: date,
          departureTime: dep
        });
        if (exists) continue;

        await Schedule.create({
          busId: bus._id,
          routeId: route._id,
          dateOfJourney: date,
          departureTime: dep,
          arrivalTime: arr
        });
        createdSchedules++;
      }
    }
  }

  console.log(`Created ${createdSchedules} schedules across ${routes.length} routes for next ${days} days.`);
  await mongoose.disconnect();
  process.exit(0);
}

function shuffleArray(a) {
  return a.sort(() => 0.5 - Math.random());
}

function addMinutesToTimeString(timeStr, mins) {
  const [hh, mm] = timeStr.split(':').map(Number);
  const dt = new Date();
  dt.setHours(hh, mm, 0, 0);
  dt.setMinutes(dt.getMinutes() + mins);
  const h = String(dt.getHours()).padStart(2, '0');
  const m = String(dt.getMinutes()).padStart(2, '0');
  return `${h}:${m}`;
}

main().catch(err => {
  console.error('Seeding error:', err);
  mongoose.disconnect();
  process.exit(1);
});
