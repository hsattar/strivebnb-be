import Users from "./users.js"
import Houses from "./houses.js"
import Location from "./location.js"

// HOUSE BELONGS TO USER
// USER CAN HAVE MANY HOUSES
Users.hasMany(Houses, { onDelete: 'CASCADE' })
Houses.belongsTo(Users, { onDelete: 'CASCADE' })

// HOUSE BELONGS TO A LOCATION
// LOCATION CAN HAVE MANY HOUSES
Location.hasMany(Houses, { onDelete: 'CASCADE' })
Houses.belongsTo(Location, { onDelete: 'CASCADE' })

// HOUSE HAS MANY REVIEWS
// REVIEWS HAS MANY HOUSES


// HOUSE HAS MANY IMAGES
// IMAGES HAS MANY HOUSES


export { Users, Houses, Location }