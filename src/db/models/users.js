import { sequelize } from '../connection.js'
import sequel from 'sequelize'

const { DataTypes } = sequel

const Users = sequelize.define('user', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default Users