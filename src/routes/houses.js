import { Router } from 'express'
import { Houses } from '../db/models/index.js'
import { housesData } from '../data/housesData.js'

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
.post(async (req, res, next) => {
    try {
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

housesRouter.route('/:houseId')
.get(async (req, res, next) => {
    try {
        const house = await Houses.findByPk(req.params.houseId)
        res.send(house)
    } catch (error) {
        next(error)
    }
})
.put(async (req, res, next) => {
    try {
        const house = await Houses.update(req.body, {
            where: { id: req.params.houseId },
            returning: true
        })
        res.send(house[1][0])
    } catch (error) {
        next(error)
    }
})
.delete(async (req, res, next) => {
    try {
        const result = await Houses.destroy({
            where: { id: req.params.houseId }
        })
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
})

export default housesRouter