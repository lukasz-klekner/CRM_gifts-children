const { Router } = require("express");
const { ChildRecord } = require("../records/childRecord");

const childRouter = Router()

childRouter.get('/', (req, res) =>{
    const childrenList = ChildRecord.listAll()
    res.render('children/list', {
        childrenList
    })
})

module.exports = {
    childRouter
}