const mongoose = require('mongoose');
async function test() {
  await mongoose.connect('mongodb://localhost:27017/airbnbcloneDB');
  const db = mongoose.connection.db;
  const unit1 = await db.collection('units').findOne({ _id: new mongoose.Types.ObjectId("6a9847b8193836576f151e3d") });
  console.log("Unit1:", unit1);
  const unit2 = await db.collection('units').findOne({ _id: new mongoose.Types.ObjectId("6a984acb21491cea26afc9e7") });
  console.log("Unit2:", unit2);
  process.exit(0);
}
test();
