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

        this.name = object.name
        this.amount = object.amount
    }

    async insert(){
        await giftsCollection.insertOne(this)

        return this._id
    }

    static async listAll(){
        return await giftsCollection.find().toArray()
    }
}

module.exports = {
    GiftRecord
}