const { ObjectId } = require("mongodb")
const { childrenCollection } = require("../utils/db")
const { ValidationError } = require("../utils/errors")

class ChildRecord {
    constructor(object){
        if(!object.name || object.name.length < 3 || object.name.length > 30){
            throw new ValidationError('Imię powinno mieć co najmniej 3 litery, a najwiecej 30 liter!')
        }

        this._id = object._id
        this.name = object.name
        this.giftId = object.giftId
    }

    static async listAll(){
        return (await childrenCollection.find().toArray()).map(obj => new ChildRecord(obj)) 
    }

    static async listAllWithTheSameGift(id){
        return (await childrenCollection.find({
            giftId: new ObjectId(id)
        }).toArray()).map(obj => new ChildRecord(obj)) 
    }

    static async findOne(id){
        const result = await childrenCollection.findOne({
            _id: new ObjectId(id)
        })

        return result === null ? null : new ChildRecord(result)
    }

    async insert(){
        await childrenCollection.insertOne(this)

        return this._id
    }

    async update(){
        const { giftId, _id, name } = this
        
        return await childrenCollection.replaceOne({
            _id
        }, {
            name,
            giftId: giftId === null ? null :new ObjectId(giftId),
        })
    }
}

module.exports = {
    ChildRecord
}