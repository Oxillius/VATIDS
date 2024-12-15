import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 5000;

const CLIENT_ID = process.env.VATSIM_CLIENT_ID;
const CLIENT_SECRET = process.env.VATSIM_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

app.get('/auth/callback', async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send('Authorization code is missing');
  }

  try {
    const tokenResponse = await fetch('https://auth.vatsim.net/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        code,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      return res.status(400).send('Failed to get access token');
    }

    const userResponse = await fetch('https://auth.vatsim.net/api/user', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    const userData = await userResponse.json();
    res.send(userData);
  } catch (error) {
    console.error('Error during OAuth process:', error);
    res.status(500).send('An error occurred');
  }
});

app.get('/auth/vatsim', (req, res) => {
  const authUrl = `https://auth.vatsim.net/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&response_type=code&scope=full_name+email`;

  res.redirect(authUrl);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});