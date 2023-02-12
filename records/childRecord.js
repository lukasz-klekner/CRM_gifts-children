const { childrenCollection } = require("../utils/db")

class ChildRecord {
    static async listAll(){
        return await childrenCollection.find().toArray() 
    }
}

module.exports = {
    ChildRecord
}