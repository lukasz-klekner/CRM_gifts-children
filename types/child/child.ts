import { ObjectId } from "mongodb"
import { GiftItem } from "../gift"

export interface ChildItem {
    _id: ObjectId
    name: string
    giftId?: ObjectId
}

export interface ListChildrenResponse {
    childrenList: ChildItem[],
    giftsList: GiftItem[]
}

export type ChildItemRequest = Omit<ChildItem, '_id'>

export interface SetGiftForChildRequest {
    giftId: ObjectId
}