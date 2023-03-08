import { Router } from "express"
import { GiftRecord } from "../records/giftRecord"


export const giftRouter = Router()

giftRouter
    .get('/', async (_, res) =>{
        const giftsList = await GiftRecord.listAll()
            res.json({
            giftsList
        })
    })
    .post('/', async (req, res) =>{
        const data: GiftRecord = {
            ...req.body,
            amount: Number(req.body.amount)
        }

        const newGift = new GiftRecord(data)
        await newGift.insert()
        res.redirect('/gift')
    })