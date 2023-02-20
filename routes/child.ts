import { Router } from "express";

import { ChildRecord } from "../records/childRecord";
import { GiftRecord } from "../records/giftRecord";
import { ValidationError } from "../utils/errors";

export const childRouter = Router()

childRouter
    .get('/', async (_, res) => {
        const childrenList = await ChildRecord.listAll()
        const giftsList = await GiftRecord.listAll()

        res.render('children/list', {
            childrenList,
            giftsList
        })
    })
    .post('/', async (req, res) => {
        const data: ChildRecord = {
            ...req.body,
            name: req.body.name,
        }

        const newChild = new ChildRecord(data)

        await newChild.insert()
        res.redirect('/child')

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

        res.redirect('/child')
    })