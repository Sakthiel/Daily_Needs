import { when } from 'jest-when';
import cartService from './cartService';
import apiService from '../../helper/apiService';

jest.mock('../../helper/apiService');

describe('cart Service functionality', () => {
    it("should return all items", async () => {
        const data = [{
            id: 3,
            product: {
                id: 2,
                productName: "Milk",
                category: "Dairy",
                unitPrice: 100.00
            },
            user: {
                id: 1,
                username: "Shop_Owner",
                password: "Owner"
            },
            quantity: 12
        }];
        apiService.get.mockResolvedValue({data : data});
        const cartitems = await cartService.getCartItems() ;

        expect(cartitems.data).toHaveLength(1);

        expect(cartitems.data).toEqual(data);

    });

    it("should create a cart item", async () => {
            const payload = {
               productId : 1,
               userName : "testUser",
               quantity :2
            }
            const response = {
                id: 1,
                product: {
                    id: 1,
                    productName: "Milk",
                    category: "Dairy",
                    unitPrice: 100.00
                },
                user: {
                    id: 1,
                    username: "testUser",
                    password: "Owner"
                },
                quantity: 2
            };
            
            when(apiService.put)
            .calledWith(expect.any(String), payload)
            .mockResolvedValue({data: response});

            const createdItem = await cartService.putCartItem(payload);

            expect(createdItem).toEqual({data:response}); 
    })
})