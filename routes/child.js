const { Router } = require("express");
const { ChildRecord } = require("../records/childRecord");
const { GiftRecord } = require("../records/giftRecord");

const childRouter = Router()

childRouter.get('/', async (req, res) =>{
    const childrenList = await ChildRecord.listAll()
    const giftsList = await GiftRecord.listAll()

    res.render('children/list', {
        childrenList,
        giftsList
    })
})

module.exports = {
    childRouter
}