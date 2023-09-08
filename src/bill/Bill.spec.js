import { shallow } from "enzyme";
import { render ,waitFor ,screen ,fireEvent} from "@testing-library/react";
import {getCartItems} from "../cart/service/cartService";
import {Button, TableCell} from "@material-ui/core";
import { when } from "jest-when";
import Bill from "./Bill";


jest.mock("../cart/service/cartService", () => ({
    getCartItems : jest.fn(),

}));
describe("Basic rendering and functionality of Bill Compoenent" , () => {
    it("Should render the title" , () => {
        const billComponent = shallow(<Bill/>);
        const header = billComponent.find('h1')
        expect(header).toHaveLength(1);
        expect(header.text()).toBe("Bill");

    });

    it("should render a table", () => {
        render(<Bill/>);

        expect(screen.getByTestId("table")).toBeInTheDocument();
    });

    it("should render the column headers" , async() => {

        render(<Bill/>);
        expect(screen.getByText('Product Name')).toBeInTheDocument();
        expect(screen.getByText('Category')).toBeInTheDocument();
        expect(screen.getByText('Unit Price')).toBeInTheDocument();
        expect(screen.getByText('Quantity')).toBeInTheDocument();
        expect(screen.getByText('Total')).toBeInTheDocument();
    });

    it("should render the cart item details " , async () => {
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

        render(<Bill/>);

        await waitFor(() => {
            expect(screen.getByText("Milk")).toBeInTheDocument();
            expect(screen.getByText("Dairy")).toBeInTheDocument();
            expect(screen.getByText("100.00" , {exact :false})).toBeInTheDocument();
            expect(screen.getByText("12")).toBeInTheDocument();
            });


    });

    it("should render the total price of individual items" , async () => {
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

        render(<Bill/>);

        await waitFor(() => {
            expect(screen.getByText("1200.00", {exact :false})).toBeInTheDocument();
            
            });


    });

    it("should render the total price all items" , async () => {
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
        }, {
            id : 4,
            product : {
                id: 1,
                productName: "Apple",
                category: "Fruit",
                unitPrice: 100.00
            },
            user: {
                id: 1,
                username : "Shop_Owner",
                password : "Owner"
            },
            quantity : 3
        }]});

        render(<Bill/>);

        await waitFor(() => {
            const totalPrice = screen.findByText("1500.00", {exact :false});
            });


    });
})