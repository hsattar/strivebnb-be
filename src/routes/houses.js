import { Router } from 'express'
import { Houses } from '../db/models/index.js'

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
        res.send('OK')
    } catch (error) {
        next(error)
    }
})

housesRouter.post('/bulkcreate', async (req, res, next) => {
    try {
        res.send('OK')
    } catch (error) {
        next(error)
    }
})

housesRouter.route('/:houseId')
.get(async (req, res, next) => {
    try {
        res.send('OK')
    } catch (error) {
        next(error)
    }
})
.put(async (req, res, next) => {
    try {
        res.send('OK')
    } catch (error) {
        next(error)
    }
})
.delete(async (req, res, next) => {
    try {
        res.send('OK')
    } catch (error) {
        next(error)
    }
})

export default housesRouter