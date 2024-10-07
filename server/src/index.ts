import express from 'express'

import { v1 } from './routes/v1'

const app = express()
app.use(express.json())

app.use('/api/v1', v1)

app.listen(3001, () => {
  console.log('Server is running on port 3001')
})
