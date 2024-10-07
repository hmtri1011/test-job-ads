import express from 'express'
import cors from 'cors'

import { v1 } from './routes/v1'

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/v1', v1)

app.listen(3001, () => {
  console.log('Server is running on port 3001')
})
