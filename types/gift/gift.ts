import { ObjectId } from "mongodb"

export interface GiftItem {
    _id: ObjectId
    name: string
    amount: number
}

export type GiftItemRequest = Omit<GiftItem, '_id'>