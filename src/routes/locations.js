import { Router } from 'express'
import { Location } from '../db/models/index.js'
import { locationData } from '../data/locationData.js'
import { locationBodyValidator } from '../middlewares/validation.js'
import { validationResult } from 'express-validator'
import { invalidIdError, badRequestError, notFoundError } from '../data/errorMessages.js'

const locationRouter = Router()

locationRouter.route('/')
.get(async (req, res, next) => {
    try {
        const location = await Location.findAll()
        res.send(location)
    } catch (error) {
        next(error)
    }
})
.post(locationBodyValidator, async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return next({ code: 4000, msg: errors })
        const user = await Location.create(req.body)
        res.send(user)
    } catch (error) {
        next(error)
    }
})

locationRouter.post('/bulkcreate', async (req, res, next) => {
    try {
        const location = await Location.bulkCreate(locationData)
        res.send(location)
    } catch (error) {
        next(error)
    }
})

locationRouter.route('/:locationId')
.get(async (req, res, next) => {
    try {
        if (req.params.locationId.length !== 36) return next({ code: 400, msg: invalidIdError })
        const location = await Location.findByPk(req.params.locationId)
        if (!location) return next({ code: 404, msg: notFoundError })
        res.send(location)
    } catch (error) {
        next(error)
    }
})
.put(async (req, res, next) => {
    try {
        if (req.params.locationId.length !== 36) return next({ code: 400, msg: invalidIdError })
        const location = await Location.update(req.body, {
            where: { id: req.params.locationId },
            returning: true
        })
        if (!location) return next({ code: 404, msg: notFoundError })
        res.send(location[1][0])
    } catch (error) {
        next(error)
    }
})
.delete(async (req, res, next) => {
    try {
        if (req.params.locationId.length !== 36) return next({ code: 400, msg: invalidIdError })
        const result = await Location.destroy({
            where: { id: req.params.locationId }
        })
        if (!result) return next({ code: 404, msg: notFoundError })
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
})

export default locationRouter