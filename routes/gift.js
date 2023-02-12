const { Router } = require("express");
const { GiftRecord } = require("../records/giftRecord");

const giftRouter = Router()

giftRouter.get('/', async (req, res) =>{
    const giftsList = await GiftRecord.listAll()
    console.log(giftsList)
    res.render('gift/list', {
        giftsList
    })
})

module.exports = {
    giftRouter
}