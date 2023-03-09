import { ObjectId } from "mongodb"

export interface GiftItem {
    _id?: ObjectId
    name: string
    amount: number
}