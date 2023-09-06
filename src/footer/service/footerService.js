import apiService from "../../helper/apiService";

export default {
    getVersionDetails: async()=>{
        const response = await apiService.getWithoutAuth(`version`);
        // console.log(response);
        return response;
    }
}