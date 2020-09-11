import fetch from "isomorphic-unfetch";

import config from "../.config.js";

const HOST = {
  development: "http://localhost:1776/api",
  production: `http://${config.production || ""}:1776/api`
}[process.env.NODE_ENV];

export async function getFetch(url = HOST) {
  const response = await fetch(`${HOST}${url}`);
  const responseData = await response.json();
  return responseData;
}

export async function postFetch(url, body) {
  try {
    const request = await fetch(`${HOST}${url}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (request.status === 200) {
      const response = await request.json();
      return response;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function deleteFetch(url, body) {
  try {
    const request = await fetch(`${HOST}${url}`, {
      method: "DELETE",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const response = await request.json();
    return response;
  } catch (error) {
    console.log(error);
  }
}
