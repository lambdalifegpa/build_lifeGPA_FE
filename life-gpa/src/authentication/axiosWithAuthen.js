import axios from 'axios';

const axiosWithHeaders = () => {
    return axios.create({
        headers: {
            "content-type": "application/json",
            Authorization: localStorage.getItem("token")
        }
    })
}

export default axiosWithHeaders