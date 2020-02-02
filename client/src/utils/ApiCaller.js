import axios from 'axios'
export default function callApi(endPoint, data, method = 'GET', headers) {
    return axios({
        method,
        url: `http://localhost:3001/api/${endPoint}`,
        data,
        headers
    })
}