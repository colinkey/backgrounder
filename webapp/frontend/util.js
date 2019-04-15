import fetch from "isomorphic-unfetch";

const HOST = {
  development: "http://localhost:1776",
  production: "http://:1776"
}[process.env.NODE_ENV];

export async function getFetch(url = HOST) {
  const response = await fetch(url);
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
