const { Router } = require("express");
const { ChildRecord } = require("../records/childRecord");
const { GiftRecord } = require("../records/giftRecord");
const { ValidationError } = require("../utils/errors");

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
    .patch('/gift/:id', async (req, res) => {
        const { id } = req.params
        const child = await ChildRecord.findOne(id)

        if(child === null) {
            throw new ValidationError('Nie ma takiego dziecka na liscie!')
        }

        const { giftId } = req.body
         const result  = giftId === "" ? null : await GiftRecord.findOne(giftId)

         child.giftId = result?._id ?? null
         child.update()

         res.redirect('/child')
    })

module.exports = {
    childRouter
}