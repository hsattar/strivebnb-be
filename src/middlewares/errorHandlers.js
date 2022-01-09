export const errorHandlers = (err, req, res, next) => {
    switch (err.code) {
        case 400: 
            res.status(400).send(err.msg)
            break;
        case 404: 
            res.status(404).send(err.msg)
            break;
        default: 
            res.status(500).send('Server Error')
    }
}