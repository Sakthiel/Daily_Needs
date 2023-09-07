import React from "react";
import {fireEvent, render , screen , waitFor} from "@testing-library/react";
import EditPriceListModal from "./EditPriceListModal";
import {editPriceList , getPriceDetails} from "./service/priceListService";
import PriceList from "./PriceList";
import {when} from "jest-when"
import { Button } from "@material-ui/core";

jest.mock("./service/priceListService", () => ({
    editPriceList : jest.fn(),
    getPriceDetails : jest.fn()

}));

describe("Basic Rendering of EditPricelistModal" ,() => {
    const open = true;
    const onClose = jest.fn();

    const initialData = {
        productName : "Apple",
        category : "Fruit" , 
        unitPrice : 100
    }
    const index = 0;
    it("Should display the title" ,() => {
        
        const modalComponent = render(<EditPriceListModal open = {open} onClose ={onClose} editModal={false} initialData={initialData}/> );

        expect(screen.getByText("Edit a Price List")).toBeInTheDocument();
    });


    it("it has three required fields" , async() => {
        const component = render(<EditPriceListModal open = {open} onClose ={onClose} editModal={true} initialData={initialData} />);
        
        const productNameInput =  component.getByTestId('productname-input');
        const categoryInput = component.getByTestId('category-input');
        const priceInput = component.getByTestId('price-input');
        const Submit = component.getByText('Submit');

        expect(productNameInput).toBeInTheDocument();
        expect(categoryInput).toBeInTheDocument();
        expect(priceInput).toBeInTheDocument();
        expect(Submit).toBeInTheDocument();
    });

    it("should edit the priceList" , async() => {
        when(getPriceDetails).calledWith().mockReturnValue({data : [{id : 1 , productName : "Apple" , category : "Fruit" , unitPrice : 200}]});
        const component = render(<PriceList/>);
        
        await waitFor(() => {
        const buttonComponent = screen.getByText("Edit");
        fireEvent.click(buttonComponent);
        const productNameInput =  component.getByTestId('productname-input').querySelector('input');
        const categoryInput = component.getByTestId('category-input').querySelector('input');
        const priceInput = component.getByTestId('price-input').querySelector('input');
        const Submit = component.getByText('Submit');
        
        fireEvent.change(productNameInput, { target: { value: 'Apple' } });
        fireEvent.change(categoryInput, { target: { value: 'Fruit' } });
        fireEvent.change(priceInput, { target: { value: '100' } });
        // fireEvent.click(Submit);

        // expect(screen.getByText('100')).toBeInTheDocument();
        });
        

    });

});