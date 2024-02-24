const { MongoClient } = require('mongodb');

const databaseURL = 'mongodb://127.0.0.1:27017';
const dbNameUserDetails = 'UserDetails';
const dbNameMilkDetails = 'MilkDetails';

async function getConnectionUserDetails() {
  const client = new MongoClient(`${databaseURL}/${dbNameUserDetails}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log(`Connected to the ${dbNameUserDetails} database`);
    const db = client.db(dbNameUserDetails);
    return db.collection('User');
  } catch (error) {
    console.error('Error connecting to the database', error);
    throw error;
  }
}

async function getConnectionMilkDetails() {
  const client = new MongoClient(`${databaseURL}/${dbNameMilkDetails}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log(`Connected to the ${dbNameMilkDetails} database`);
    const db = client.db(dbNameMilkDetails);
    return db.collection('details');
  } catch (error) {
    console.error('Error connecting to the database', error);
    throw error;
  }
}

module.exports = {
  getConnectionUserDetails,
  getConnectionMilkDetails,
};
