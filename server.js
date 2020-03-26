import express from 'express'

const app = express()

const client_id = process.env.GITHUB_CLIENT_ID
const client_secret = process.env.GITHUB_CLIENT_SECRET
console.log({ client_id, client_secret })

app.get('/', (req, res) => {
  res.send('Hello GitHub auth')
})
const PORT = process.env.PORT || 9000
app.listen(PORT, () => console.log('Listening on localhost:' + PORT))
