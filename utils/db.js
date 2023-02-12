const { MongoClient } = require("mongodb");

const URL = 'mongodb://localhost:27017';
const DB_NAME = 'megak_gifts'
const GIFTS_COLLECTION = 'gifts'
const CHILDREN_COLLECTION = 'children'

const client = new MongoClient(URL)
client.connect();
const db = client.db(DB_NAME);
const giftsCollection = db.collection(GIFTS_COLLECTION);
const childrenCollection = db.collection(CHILDREN_COLLECTION);
 

  module.exports = {
    giftsCollection,
    childrenCollection,
  }