import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const ENV = {
  projectKey: process.env.CTP_PROJECT_KEY,
  clientSecret: process.env.CTP_CLIENT_SECRET,
  clientId: process.env.CTP_CLIENT_ID,
  authUrl: process.env.CTP_AUTH_URL,
  apiUrl: process.env.CTP_API_URL,
  ctpScopes: process.env.CTP_SCOPES,
};

async function getToken() {
  try {
    const response = await axios.post(
      `${ENV.authUrl}/oauth/token`,null,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: {
          'grant_type': "client_credentials",
        },
        auth:{
          username: ENV.clientId,
          password: ENV.clientSecret,
        }
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

getToken();

