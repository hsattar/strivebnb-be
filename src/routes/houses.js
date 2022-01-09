import { Router } from 'express'
import { Houses } from '../db/models/index.js'
import { housesData } from '../data/housesData.js'
import { housesBodyValidator, userLocationIdValidation } from '../middlewares/validation.js'
import { validationResult } from 'express-validator'
import { invalidIdError, badRequestError, notFoundError } from '../data/errorMessages.js'

const housesRouter = Router()

housesRouter.route('/')
.get(async (req, res, next) => {
    try {
        const houses = await Houses.findAll()
        res.send(houses)
    } catch (error) {
        next(error)
    }
})
.post(housesBodyValidator, userLocationIdValidation, async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return next({ code: 4000, msg: errors })
        const house = await Houses.create(req.body)
        res.send(house)
    } catch (error) {
        next(error)
    }
})

housesRouter.post('/bulkcreate', async (req, res, next) => {
    try {
        const houses = await Houses.bulkCreate(housesData)
        res.send(houses)
    } catch (error) {
        next(error)
    }
})

housesRouter.delete('/deleteall', async (req, res, next) => {
    try {
        const houses = await Houses.destroy({ truncate: true })
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
})

housesRouter.route('/:houseId')
.get(async (req, res, next) => {
    try {
        if (req.params.houseId.length !== 36) return next({ code: 400, msg: invalidIdError })
        const house = await Houses.findByPk(req.params.houseId)
        if (!house) return next({ code: 404, msg: notFoundError })
        res.send(house)
    } catch (error) {
        next(error)
    }
})
.put(async (req, res, next) => {
    try {
        if (req.params.houseId.length !== 36) return next({ code: 400, msg: invalidIdError })
        const house = await Houses.update(req.body, {
            where: { id: req.params.houseId },
            returning: true
        })
        if (!house) return next({ code: 404, msg: notFoundError })
        res.send(house[1][0])
    } catch (error) {
        next(error)
    }
})
.delete(async (req, res, next) => {
    try {
        if (req.params.houseId.length !== 36) return next({ code: 400, msg: invalidIdError })
        const result = await Houses.destroy({
            where: { id: req.params.houseId }
        })
        if (!result) return next({ code: 404, msg: notFoundError })
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
})

export default housesRouter