import { router } from express

router
    .get('/', (req, res) => {
        res.send('entry')
    })
