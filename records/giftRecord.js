const { giftsCollection } = require("../utils/db")

class GiftRecord {
    static async listAll(){
        return await giftsCollection.find().toArray()
    }
}

module.exports = {
    GiftRecord
}