import express from "express"
import path from "path"
import { requestTime, logger } from "./middleware/index.js"
import serverRoutes from "./routes/index.js"
const __dirname = path.resolve()
const PORT = process.env.PORT ?? 3000
const app = express()

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'templates'))
console.log(app.get('views'))

app.use(express.static(path.resolve(__dirname, 'static')))
app.use(requestTime)
app.use(logger)
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(serverRoutes)

app.get('/', (req, res) => {
    res.render('index', {title: 'Start Page', active: 'index'})
})
app.get('/contact', (req, res) => {
    res.render('contact', {title: 'Contact', active: 'contact'})
})

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})