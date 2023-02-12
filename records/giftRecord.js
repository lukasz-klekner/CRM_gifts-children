const { ObjectId } = require("mongodb")
const { giftsCollection } = require("../utils/db")
const { ValidationError } = require("../utils/errors")

class GiftRecord {
    constructor(object){
        if(!object.name || object.name.length < 3 || object.name.length > 50){
            throw new ValidationError('Nazwa prezentu musi miec od 3 do 50 znakow!')
        }

        if(!object.amount || object.amount < 1){
            throw new ValidationError('Liczba sztuk prezentu musi byc wieksza od 1!')
        }

        this._id = object._id
        this.name = object.name
        this.amount = object.amount
    }

    async insert(){
        await giftsCollection.insertOne(this)

        return this._id
    }

    static async listAll(){
        return (await giftsCollection.find().toArray()).map(obj => new GiftRecord(obj))
    }

    static async findOne(id){
        const result = await giftsCollection.findOne({
            _id: new ObjectId(id)
        })

        return result === null ? null : new GiftRecord(result)
    }
}

module.exports = {
    GiftRecord
}