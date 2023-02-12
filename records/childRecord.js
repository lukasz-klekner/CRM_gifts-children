const { childrenCollection } = require("../utils/db")
const { ValidationError } = require("../utils/errors")

class ChildRecord {
    constructor(object){
        if(!object.name || object.name.length < 3 || object.name.length > 30){
            throw new ValidationError('Imię powinno mieć co najmniej 3 litery, a najwiecej 30 liter!')
        }

        this.name = object.name
        this.giftId = object.giftId
    }

    static async listAll(){
        return await childrenCollection.find().toArray() 
    }

    async insert(){
        await childrenCollection.insertOne(this)

        return this._id
    }
}

module.exports = {
    ChildRecord
}