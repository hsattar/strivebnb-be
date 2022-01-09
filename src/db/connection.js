import Sequelize from "sequelize"

const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_DIALECT, DATABASE_URL } = process.env

// export const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
//     host: DB_HOST,
//     dialect: DB_DIALECT
// })

export const sequelize = new Sequelize(DATABASE_URL, {
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        }
    }
})

export const testDBConnection = async () => {
    try {
        await sequelize.authenticate({ logging: false })
        console.log('DB Connected')
        await sequelize.sync({ logging: false })
    } catch (error) {
        console.error('DB Failed', error)
    }
}