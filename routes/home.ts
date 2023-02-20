import { Router } from "express"


export const homeRouter = Router()

homeRouter.get('/', (_, res) => {
    res.redirect('/child')
})