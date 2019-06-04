import axios from 'axios';
axios.defaults.timeout = 30000;
import store from '../vuex/store'




// 环境的切换

if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = 'https://territorydataplatformdev.apps.pp01.cnnorth.cf.ford.com.cn';
} else if (process.env.NODE_ENV == 'debug') {
  axios.defaults.baseURL = 'https://territorydataplatformdev.apps.pp01.cnnorth.cf.ford.com.cn';
} else if (process.env.NODE_ENV == 'production') {
  axios.defaults.baseURL = 'https://territorydataplatformdev.apps.pp01.cnnorth.cf.ford.com.cn';

}

//http request 拦截器
axios.interceptors.request.use(
  config => {
    // console.log("config:",config)
    let url = config.url
    console.log("999:", url)
    if (url != 'https://wechat.apps.pp01.cnnorth.cf.ford.com.cn/dsl/wechat/v1/proxy/signature') {
      if (localStorage.getItem('token')) {
        config.headers.Authorization = "bearer " + localStorage.getItem('token');
      }
    }
    store.commit('showloading');
    config.headers['Content-Type'] = 'application/json ';
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);






//http response 拦截器
axios.interceptors.response.use(
  response => {
    store.commit('hideloading')
    console.log(response);
    if (response.error == 'invalid_token' && response.error_description.split(':')[0] == 'Access token expired') {

    }
    return response;
  },
  error => {
    store.commit('hideloading')
    return Promise.reject(error)
  }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        console.log(response);
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}

/**
* 封装patch请求
* @param url
* @param data
* @returns {Promise}
*/

export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}

/**
* 封装put请求
* @param url
* @param data
* @returns {Promise}
*/

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}

/**
* 封装delete请求
* @param url
* @param data
* @returns {Promise}
*/

export function delect(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.delete(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}
