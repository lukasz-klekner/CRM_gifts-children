const { Router } = require("express");
const { ChildRecord } = require("../records/childRecord");
const { GiftRecord } = require("../records/giftRecord");

const childRouter = Router()

childRouter.get('/', (req, res) =>{
    const childrenList = ChildRecord.listAll()
    const giftsList = GiftRecord.listAll()

    res.render('children/list', {
        childrenList,
        giftsList
    })
})

module.exports = {
    childRouter
}