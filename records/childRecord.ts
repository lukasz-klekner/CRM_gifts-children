import { ObjectId } from "mongodb"
import { ChildItem } from "../types"

import { childrenCollection } from "../utils/db"
import { ValidationError } from "../utils/errors"

export class ChildRecord {
    _id?: ObjectId
    name: string
    giftId?: ObjectId

    constructor(object: ChildItem){
        if(!object.name || object.name.length < 3 || object.name.length > 30){
            throw new ValidationError('Imię powinno mieć co najmniej 3 litery, a najwiecej 30 liter!')
        }

        this._id = object._id
        this.name = object.name
        this.giftId = object.giftId
    }

    static async listAll(){
        return (await childrenCollection.find().toArray() as ChildItem[]).map((obj) => new ChildRecord(obj)) 
    }

    static async listAllWithTheSameGift(id: string){
        return (await childrenCollection.find({
            giftId: new ObjectId(id)
        }).toArray() as ChildItem[]).map((obj) => new ChildRecord(obj)) 
    }

    static async findOne(id: string): Promise<ChildRecord | null>{
        const result = await childrenCollection.findOne({
            _id: new ObjectId(id)
        }) as ChildItem

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