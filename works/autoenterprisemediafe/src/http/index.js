import axios from 'axios'
import config from '../ipconfig/index'

export default class ajax {
  constructor () {
    const http = axios.create({
      baseURL: config(),
      timeout: 0,
    })
    http.interceptors.request.use(
      request => {
        return request
      }
    )
    http.interceptors.response.use(
      response => {
        const { data } = response
        if (data && data !== '') return data
      },
      error => {
        return Promise.reject(error)
      }
    )
    this._http = http
  }

  get (api, params = {}, responseType = 'json') {
    return this._http.get(api, {
      params: params,
      responseType: responseType,
      headers: {
        'Content-type': 'application/json'
      }
    })
  }

  post (api, params = {}, config) {
    if (config) return this._http.post(api, params, config)
    else {
      config = {
        headers: {
          'Content-type': 'multipart/form-data'
        }
      }
      // const formData = new FormData()
      // Object.keys(params).forEach(key => formData.append(key, params[key]))
      return this._http.post(api, params, config)
    }
  }
}
