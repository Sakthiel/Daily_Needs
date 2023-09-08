import apiService from "../../helper/apiService";

export default {
  
    createCustomer: async(payload) => {
        const response = await apiService.postWithoutAuth('customer' , payload);
        return response;
    }
}