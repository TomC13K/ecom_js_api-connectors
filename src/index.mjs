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
  const url = `${ENV.authUrl}/oauth/token`;
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    params: {
      grant_type: "client_credentials",
    },
    auth: {
      username: ENV.clientId,
      password: ENV.clientSecret,
    },
  };

  // AXIOS POST format is URL, Body(data) , config - header, params,auth...
  try {
    const response = await axios.post(url, null, config);
    //console.log(response.data.access_token);
    return response.data.access_token;
  } catch (error) {
    console.error(error);
  }
}

async function useTokenGetProducts() {
  const token = await getToken();
  console.log("token >> ", token);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const url = `${ENV.apiUrl}/${ENV.projectKey}/products`;

  try {
    const response = await axios.get(url, config);

    //console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}

async function productCleanup(){
  const products = await useTokenGetProducts();
  console.log(products);
}

//getToken();
//useTokenGetProducts();
productCleanup();