const { Router } = require("express");
const { ChildRecord } = require("../records/childRecord");
const { GiftRecord } = require("../records/giftRecord");

const childRouter = Router()

childRouter
    .get('/', async (req, res) => {
        const childrenList = await ChildRecord.listAll()
        const giftsList = await GiftRecord.listAll()

        res.render('children/list', {
            childrenList,
            giftsList
        })
    })
    .post('/', async (req, res) => {
        const { name } = req.body

        const newChild = new ChildRecord({
            name
        })

        await newChild.insert()

        res.redirect('/child')

    })

module.exports = {
    childRouter
}