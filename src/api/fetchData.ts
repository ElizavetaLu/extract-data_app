import axios from "axios"


export default axios.create({
    baseURL: 'http://localhost:3232/',
    headers: {
        APIkey: 'wbchd/HBLJCsa&sHfSB-LSD-snjc',
    }
})