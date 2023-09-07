import apiService from "../../helper/apiService";

export default {
    putCartItem: async(payload)=>{
        const response = await apiService.put(`carts`,payload);
        // console.log(response);
        return response;
    },

    getCartItems: async() => {
        const response = await apiService.get('carts');
        return response;
    }
,
    deleteCartItem: async(id) => {
        const response = await apiService.delete(`carts/${id}`);
        return response;
    },

    decrementCartItem: async(payload , id) => {
        const response = await apiService.put(`carts/${id}`,payload);
        return response;
    }
}