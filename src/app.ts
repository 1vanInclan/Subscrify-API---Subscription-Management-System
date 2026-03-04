import express, { type Application } from 'express'
import cors from 'cors'
import { createSubscriptionRouter } from './routes/subscriptions.js'


const app: Application = express()

app.use(express.json())
app.use(cors())

app.use('/susbcriptions', createSubscriptionRouter())


export default app