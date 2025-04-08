import axios from "axios";
import { GayaServerWebAPI_URL } from "../utils/settings";
import DOMPurify from 'dompurify';

// export const getAPI = async (url: string, data: any): Promise<any> => {
 
//     return await axios({
//         url: `${GayaServerWebAPI_URL}/${url}`
//     }).then((response) => {
//         return {
//             status: response.status,
//             data: response.data
//         }
//     }).catch((error) => {
//         return error
//     })
// }

// export const deleteAPI = async (url: string, data?: any): Promise<any> => {
//     return await axios.delete(`${GayaServerWebAPI_URL}/${url}`, { data })
//         .then((response) => ({
//             status: response.status,
//             data: response.data
//         }))
//         .catch((error) => error);
// }

const handleRequest = async (request: Promise<any>) => {
    try {
        const response = await request;
        return {
            status: response.status,
            data: response.data
        };
    } catch (error: any) {
        return {
            status: error.response?.status || 500,
            error: error.response?.data || error.message || 'Unknown error'
        };
    }
};

export const getAPI = (url: string): Promise<any> => {
    return handleRequest(axios({ url: `${GayaServerWebAPI_URL}/${url}` }));
};

export const deleteAPI = (url: string, data?: any): Promise<any> => {
    return handleRequest(
        axios.delete(`${GayaServerWebAPI_URL}/${url}`, { data })
    );
};

export const postAPI = (url: string, data?: any): Promise<any> => {
    return handleRequest(
        axios.post(`${GayaServerWebAPI_URL}/${url}`, data)
    );
};

export const putAPI = (url: string, data?: any): Promise<any> => {
    return handleRequest(
        axios.put(`${GayaServerWebAPI_URL}/${url}`, data)
    );
};

export const getOperations = () => getAPI("operations").then((res) => {
    console.log("getOperations")
    if(res.name == "AxiosError") {
        if(res.code == "ERR_NETWORK")
            return { error: "Server is down", operations: null }
        else if(res.code == "ERR_BAD_REQUEST")
            return { error: res.message + "\r\n" + res.response.data.Message, operations: null }
    } else if(res.status == 500) {
        return { error: res.error, operations: null }
    } else {
        //console.log("getOperations_ res", res)
        return { error: "", operations: res.data }
        // setOperations(res.data)
        // setOperation(res.data[0].Name)
    }
})

export default getAPI