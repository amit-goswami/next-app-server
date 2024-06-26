import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import connectToDB from './config/database'
import authRoutes from './routes/authRoutes'
import userRoutes from './routes/userRoutes'
import queryRoutes from './routes/queryRoutes'
import { END_POINT } from './types/shared.interface'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(morgan('combined'))

app.get(END_POINT.BASE_URL, (_req, res) => {
  res.send('Hello World!')
})

app.use(END_POINT.BASE_URL, authRoutes)
app.use(END_POINT.BASE_URL, userRoutes)
app.use(END_POINT.BASE_URL, queryRoutes)

const port = process.env.PORT
const exitProcess = 1

connectToDB()
  .then(() =>
    app.listen(port, () =>
      console.log(`Server running on http://localhost:${port}`)
    )
  )
  .catch((err) => {
    console.error('Error connecting to the database:', err)
    process.exit(exitProcess)
  })
