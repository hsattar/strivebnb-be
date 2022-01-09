import { checkSchema, check } from 'express-validator'
import { Users } from '../db/models/index.js'

export const usersRegistrationValidator = checkSchema({
    name: {
        in: ['body'],
        isLength: {
            options: { min: 1 }
        },
        errorMessage: 'You Must Provide a Name'
    },
    lastName: {
        in: ['body'],
        isLength: {
            options: { min: 1 }
        },
        errorMessage: 'You Must Provide a Last Name'
    }
})

export const locationBodyValidator = checkSchema({
    country: {
        in: ['body'],
        isLength: {
            options: { min: 1 }
        },
        errorMessage: 'You Must Provide a Country'
    },
    city: {
        in: ['body'],
        isLength: {
            options: { min: 1 }
        },
        errorMessage: 'You Must Provide a City'
    },
    postcode: {
        isPostalCode: {
            options: 'GB'
        },
        errorMessage: 'You Must Provide a Valid UK Post Code'
    }
})

export const housesBodyValidator = checkSchema({
    name: {
        in: ['body'],
        isLength: {
            options: { min: 1 }
        },
        errorMessage: 'You Must Provide a Name'
    },
    description: {
        in: ['body'],
        isLength: {
            options: { min: 1 }
        },
        errorMessage: 'You Must Provide a Description'
    },
    price: {
        in: ['body'],
        isInt: true,
        toInt: true,
        errorMessage: 'You Must Enter a Price as a Number'
    },
    userId: {
        in: ['body'],
        isLength: {
            options: { min: 1 }
        },
        errorMessage: 'You Must Provide a valid userID'
    },
    locationId: {
        in: ['body'],
        isLength: {
            options: { min: 1 }
        },
        errorMessage: 'You Must Provide a valid locationID'
    }
})

export const userLocationIdValidation = [
    check('userId').custom(async value => {
        let msg = ''
        const users =  await Users.findAll({
            attributes: ['id']
        })
        const userIdExists = users.findIndex(id => id === value)
        if (userIdExists === -1) return msg = 'userID does not exist.'
        return msg
    })
]