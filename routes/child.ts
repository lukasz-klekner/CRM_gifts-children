import { Router } from "express";

import { ChildRecord } from "../records/childRecord";
import { GiftRecord } from "../records/giftRecord";
import { ChildItem, ListChildrenResponse } from "../types";
import { ValidationError } from "../utils/errors";

export const childRouter = Router()

childRouter
    .get('/', async (_, res) => {
        const childrenList = await ChildRecord.listAll()
        const giftsList = await GiftRecord.listAll()

        res.json({
            childrenList,
            giftsList
        } as ListChildrenResponse)
    })
    .post('/', async (req, res) => {
        const data: ChildItem = {
            ...req.body,
            name: req.body.name,
        }

        const newChild = new ChildRecord(data)

        await newChild.insert()
        res.json(newChild)

    })
    .patch('/gift/:id', async (req, res) => {
        const { id } = req.params
        const child = await ChildRecord.findOne(id)

        if(child === null) {
            throw new ValidationError('Nie ma takiego dziecka na liscie!')
        }

        const { giftId } = req.body
        const result  = giftId === "" ? null : await GiftRecord.findOne(giftId)

        if(result){
            const giftInStock = result.amount - (await ChildRecord.listAllWithTheSameGift(giftId)).length
            
            if(giftInStock <= 0){
                throw new Error('This gift is out of stock atm! :-(')
            }
        }

        child.giftId = result?._id ?? null
        child.update()

        res.json
    })