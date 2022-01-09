import { Router } from 'express'
import { Users } from '../db/models/index.js'
import { userData } from '../data/userData.js'
import { invalidIdError, badRequestError, notFoundError } from '../data/errorMessages.js'

const usersRouter = Router()

usersRouter.route('/')
.get(async (req, res, next) => {
    try {
        const users = await Users.findAll()
        res.send(users)
    } catch (error) {
        next(error)
    }
})
.post(async (req, res, next) => {
    try {
        const user = await Users.create(req.body)
        res.send(user)
    } catch (error) {
        next(error)
    }
})

usersRouter.post('/bulkcreate', async (req, res, next) => {
    try {
        const users = await Users.bulkCreate(userData)
        res.send(users)
    } catch (error) {
        next(error)
    }
})

usersRouter.route('/:userId')
.get(async (req, res, next) => {
    try {
        if (req.params.userId.length !== 36) return next({ code: 400, msg: invalidIdError })
        const user = await Users.findByPk(req.params.userId)
        if (!user) return next({ code: 404, msg: notFoundError })
        res.send(user)
    } catch (error) {
        next(error)
    }
})
.put(async (req, res, next) => {
    try {
        if (req.params.userId.length !== 36) return next({ code: 400, msg: invalidIdError })
        const user = await Users.update(req.body, {
            where: { id: req.params.userId },
            returning: true
        })
        if (!user) return next({ code: 404, msg: notFoundError })
        res.send(user[1][0])
    } catch (error) {
        next(error)
    }
})
.delete(async (req, res, next) => {
    try {
        if (req.params.userId.length !== 36) return next({ code: 400, msg: invalidIdError })
        const result = await Users.destroy({
            where: { id: req.params.userId }
        })
        if (!result) return next({ code: 404, msg: notFoundError })
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
})

export default usersRouter