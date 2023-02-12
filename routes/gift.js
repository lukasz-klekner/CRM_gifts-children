const { Router } = require("express");
const { GiftRecord } = require("../records/giftRecord");

const giftRouter = Router()

giftRouter
    .get('/', async (req, res) =>{
        const giftsList = await GiftRecord.listAll()
            res.render('gift/list', {
            giftsList
        })
    })
    .post('/', async (req, res) =>{
        const { name, amount } = req.body

        const newGift = new GiftRecord({
            name,
            amount: Number(amount)
        })

        await newGift.insert(newGift)

        res.redirect('/gift')
    })

module.exports = {
    giftRouter
}