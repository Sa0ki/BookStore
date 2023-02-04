import axios from "axios"

const Http = axios.create({
    baseURL:"http://localhost:2233",
    headers:{"content-type": "application/json"}
})

export default Http