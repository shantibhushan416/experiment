export function error() {
    return (err, req, res, next) => {
        res.status(500).send('something went wrong')
    }
}

