import { Router } from 'express'
import { Op } from 'sequelize'
import { Houses, Location } from '../db/models/index.js'
import { housesData } from '../data/housesData.js'
import { housesBodyValidator, userIdValidation } from '../middlewares/validation.js'
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
.post(housesBodyValidator, async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return next({ code: 4000, msg: errors })
        delete req.body.id
        const house = await Houses.create(req.body)
        res.send(house)
    } catch (error) {
        next(error)
    }
})

housesRouter.get('/search', async (req, res, next) => {
    try {
        let price = []
        if (req.query.price) {
           price = req.query.price.split(',') 
        }

        const houses = await Houses.findAll({
            include: [{ 
                model: Location, 
                attributes: ['country', 'city', 'postcode'],
                ...(req.query.country && {
                    where: {
                        country: {
                            [Op.iLike]: `%${req.query.country}%`
                        }
                    }
                }),
    
                ...(req.query.city && {
                    where: {
                        city: {
                            [Op.iLike]: `%${req.query.city}%`
                        }
                    }
                })
            }],

            ...(req.query.name && {
                where: {
                    name: {
                        [Op.iLike]: `%${req.query.name}%`
                    }
                }
            }),

            ...(req.query.price && {
                where: {
                    price: {
                        [Op.between]: price
                    }
                }
            }) 
        })
        res.send(houses)
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
        delete req.body.id
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