import { sequelize } from '../connection.js'
import sequel from 'sequelize'

const { DataTypes } = sequel

const Houses = sequelize.define('house', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

export default Houses