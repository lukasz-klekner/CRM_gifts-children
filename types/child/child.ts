import { ObjectId } from "mongodb"

export interface ChildItem {
    _id: ObjectId
    name: string
    giftId?: ObjectId
}