import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const instance = axios.create({
  baseURL: 'https://cdn.contentful.com/spaces/jpl2kwkwgmlb/environments/master',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

instance.defaults.params = {};

instance.interceptors.request.use(function (config) {
  config.params['access_token'] = 'OkqBYBhvvxq0Q7fctCSozAVfrbBCtbIiCtxFefxUHa0';
  return config;
}, function (error) {
  return Promise.reject(error);
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await instance.get('/entries?content_type=blog');
  console.log('data', data.data);
  res.status(200).json(data.data);
}
