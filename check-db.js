const mongoose = require('mongoose');

async function check() {
  await mongoose.connect('mongodb://localhost:27017/airbnbcloneDB');
  const db = mongoose.connection.db;
  const booking = await db.collection('bookings').findOne({});
  console.log("Booking:", JSON.stringify(booking, null, 2));
  
  const unit = await db.collection('units').findOne({ _id: booking.unit_id });
  console.log("Unit:", unit ? unit._id : 'NOT FOUND');
  
  const host = await db.collection('users').findOne({ _id: booking.host_id });
  console.log("Host:", host ? host._id : 'NOT FOUND');

  const guest = await db.collection('users').findOne({ _id: booking.guest_id });
  console.log("Guest:", guest ? guest._id : 'NOT FOUND');
  
  process.exit(0);
}

check();
