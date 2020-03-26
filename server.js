import express from 'express'

const app = express()

const client_id = process.env.GITHUB_CLIENT_ID
const client_secret = process.env.GITHUB_CLIENT_SECRET
console.log({ client_id, client_secret })

app.get('/', (req, res) => {
  res.send('Hello GitHub auth')
})

app.get('/login/github', (req, res) => {
  const redirect_uri = 'http://localhost:9000/login/github/callback'
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${
      process.env.GITHUB_CLIENT_ID
    }&redirect_uri=${redirect_uri}`
  )
})

const PORT = process.env.PORT || 9000
app.listen(PORT, () => console.log('Listening on localhost:' + PORT))
