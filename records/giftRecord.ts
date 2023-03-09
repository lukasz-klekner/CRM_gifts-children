import  { ObjectId } from "mongodb"
import { GiftItem } from "../types"

import  { giftsCollection } from "../utils/db"
import { ValidationError } from "../utils/errors"

export class GiftRecord implements GiftItem {
    _id?: ObjectId
    name: string
    amount: number

    constructor(object: GiftRecord){
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

    async delete(){
        await giftsCollection.deleteOne({
            _id: new Object(this._id)
        })
    }

    static async listAll(){
        return (await giftsCollection.find().toArray() as GiftRecord[]).map(obj => new GiftRecord(obj))
    }

    static async findOne(id: string): Promise<GiftRecord | null>{
        const result = await giftsCollection.findOne({
            _id: new ObjectId(id)
        }) as GiftRecord

        return result === null ? null : new GiftRecord(result)
    }
}