const axios = require("axios");
const MY_TOKEN = "7744112419:AAHN6Qh1LSyZWddHyeWWWlBMEES7arMUCJo";

const BASE_URL = `http://api.telegram.org/bot${MY_TOKEN}`;
function getAxiosInstance(){
    return{
        get(method, params) {
            return axios.get(`/${method}`, {
                caseURL: BASE_URL,
                params,
            });
        },
        post(method, data){
            return axios({
                method: "post",
                baseURL: BASE_URL,
                url: `/${method}`,
                data,
            });
        },
    };
}

moduke.exports = { axiosInstance: getAxiosInstance() };