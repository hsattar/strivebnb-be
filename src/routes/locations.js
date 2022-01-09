import { Router } from 'express'
import { Location } from '../db/models/index.js'
import { locationData } from '../data/locationData.js'

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
.post(async (req, res, next) => {
    try {
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
        const location = await Location.findByPk(req.params.locationId)
        res.send(location)
    } catch (error) {
        next(error)
    }
})
.put(async (req, res, next) => {
    try {
        const location = await Location.update(req.body, {
            where: { id: req.params.locationId },
            returning: true
        })
        res.send(location[1][0])
    } catch (error) {
        next(error)
    }
})
.delete(async (req, res, next) => {
    try {
        const result = await Location.destroy({
            where: { id: req.params.locationId }
        })
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
})

export default locationRouter