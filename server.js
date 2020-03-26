import express from "express";
import fetch from "node-fetch";
import cookieSession from "cookie-session";

const app = express();
app.use(
  cookieSession({
    secret: process.env.COOKIE_SECRET
  })
);

const client_id = process.env.GITHUB_CLIENT_ID;
const client_secret = process.env.GITHUB_CLIENT_SECRET;
console.log({ client_id, client_secret });

app.get("/", (req, res) => {
  res.send("Hello GitHub auth");
});

app.get("/login/github", (req, res) => {
  const redirect_uri = "http://localhost:9000/login/github/callback";
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${redirect_uri}`
  );
});

async function getAccessToken({ code, client_id, client_secret }) {
  const request = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      client_id,
      client_secret,
      code
    })
  });
  const text = await request.text();
  const params = new URLSearchParams(text);
  return params.get("access_token");
}

async function fetchGitHubUser(token) {
  const request = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: "token " + token
    }
  });
  return await request.json();
}

app.get("/login/github/callback", (req, res) => {
  const code = req.query.code;
  const access_token = getAccessToken({ code, client_id, client_secret });
  const user = fetchGitHubUser(access_token);
  if (user.id === 1126497) {
    res.send("Hello Kevin Simper");
  } else {
    res.send("Not Authorized!");
  }
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log("Listening on localhost:" + PORT));
