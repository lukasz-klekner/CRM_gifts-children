const { Router } = require("express");
const { GiftRecord } = require("../records/giftRecord");

const giftRouter = Router()

giftRouter.get('/', (req, res) =>{
    const giftsList = GiftRecord.listAll()
    res.render('gift/list', {
        giftsList
    })
})

module.exports = {
    giftRouter
}