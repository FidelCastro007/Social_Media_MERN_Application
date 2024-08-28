import axios from "axios";
require('dotenv').config()

export default axios.create({
    baseURL: `${REACT_APP_BACKEND_URL}`
}

)
