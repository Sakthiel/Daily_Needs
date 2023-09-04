import apiService from "../../helper/apiService";

export default {
    getPriceDetails: async()=>{
        const response = await apiService.get(`products`);
        // console.log(response);
        return response;
    },
    createPriceList: async(payload) => {
        const response = await apiService.post('products' , payload);
        return response;
    },
    deletePriceList: async(id) => {
        const response = await apiService.delete(`products/${id}`);
    } ,
    editPriceList: async(payload ,id) => {
        const response = await apiService.put(`products/${id}` , payload);
    }
}