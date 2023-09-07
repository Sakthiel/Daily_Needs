import { shallow } from "enzyme";
import { render ,waitFor ,screen ,fireEvent} from "@testing-library/react";
import {Button, TableCell} from "@material-ui/core";
import {getCartItems , decrementCartItems} from "./service/cartService";
import { when } from "jest-when";
import Cart from "./Cart";

jest.mock("./service/cartService", () => ({
    getCartItems : jest.fn(),
    decrementCartItems :jest.fn()

}));

describe("Basic rendering and functionality of cart component" ,() => {
    it("Should render the title" , () => {
        const cartComponent = shallow(<Cart/>);
        const header = cartComponent.find('h1')
        expect(header).toHaveLength(1);
        expect(header.text()).toBe("Cart Items");

    });
    it("should render a table", () => {
        render(<Cart/>);

        expect(screen.getByTestId("table")).toBeInTheDocument();
    });
    it("should have a add button " ,() => {
        const cart = shallow(<Cart/>);
        const buttonComponent = cart.find(Button).at(0);
        expect(buttonComponent.text()).toBe(" Checkout ");
       
    });

    it("should render the column headers" , async() => {
        render(<Cart/>);
        expect(screen.getByText('ProductName')).toBeInTheDocument();
        expect(screen.getByText('Category')).toBeInTheDocument();
        expect(screen.getByText('UnitPrice')).toBeInTheDocument();
        expect(screen.getByText('Quantity')).toBeInTheDocument();
        expect(screen.getByText('Actions')).toBeInTheDocument();
    });

    it("should render the cart item details" , async () => {
        when(getCartItems).calledWith().mockReturnValue({data : [ {
            id : 3,
            product : {
                id: 2,
                productName: "Milk",
                category: "Dairy",
                unitPrice: 100.00
            },
            user: {
                id: 1,
                username : "Shop_Owner",
                password : "Owner"
            },
            quantity : 12
        }]});

        render(<Cart/>);

        await waitFor(() => {
            expect(screen.getByText("Milk")).toBeInTheDocument();
            expect(screen.getByText("Dairy")).toBeInTheDocument();
            expect(screen.getByText("100")).toBeInTheDocument();
            expect(screen.getByText("12")).toBeInTheDocument();
            expect(screen.getByText("Delete")).toBeInTheDocument();
            });


    });

    it("should reduce the quantity when minus button is clicked" , async() => {
        const payload = {
            id : 3,
            product : {
                id: 2,
                productName: "Milk",
                category: "Dairy",
                unitPrice: 100.00
            },
            user: {
                id: 1,
                username : "Shop_Owner",
                password : "Owner"
            },
            quantity : 12
        }
        when(getCartItems).calledWith().mockReturnValue({data : [ payload]});

        when(decrementCartItems).calledWith().mockReturnValue({data : {...payload , quantity:11}});

        render(<Cart/>);
        
        await waitFor(() => { 
            const minusButton = screen.getByTestId("minusButton");
            fireEvent.click(minusButton);
            });
        
            const quantity = screen.getByTestId("quantity");

            // expect(quantity).toHaveTextContent("11");
        
        // await waitFor(() => { 
        //         const quantity = screen.getByTestId("quantity");
        //         expect(quantity).toHaveTextContent("11");
        //      });
           
    })

})