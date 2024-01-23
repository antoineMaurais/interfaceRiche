import apiClient from "./clientApi";

const getData = () => {
    return apiClient.get('/backend');
};

export {
    getData,
};