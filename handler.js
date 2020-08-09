const axios = require("axios");
const URLSearchParams = require("url").URLSearchParams;

exports.auth = async event => {
  let body = JSON.parse(event.body);
  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("code", body.code);
  params.append("client_id", process.env.DROPBOX_APP_KEY);
  params.append("client_secret", process.env.DROPBOX_APP_SECRET);

  try {
    let token = await axios
      .post("https://api.dropbox.com/oauth2/token", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then(async response => {
        return response.data.access_token;
      });
    return {
      statusCode: 200,
      body: JSON.stringify({ token }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to get token",
      }),
    };
  }
};
