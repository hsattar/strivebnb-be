import { sequelize } from '../connection.js'
import sequel from 'sequelize'

const { DataTypes } = sequel

const Location = sequelize.define('location', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    postcode: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default Location