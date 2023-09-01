import apiService from "../../helper/apiService";

export default {
    getVersionDetails: async()=>{
        const response = await apiService.get(`version`);
        // console.log(response);
        return response;
    }
}