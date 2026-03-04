import express, { type Application } from 'express'
import cors from 'cors'


const app: Application = express()

app.use(express.json())
app.use(cors())

app.get('/cuack', (req, res) => {
  res.json({message: 'holaaaa'})
})

export default app