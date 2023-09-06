import React from "react";
import {fireEvent, render , screen , waitFor} from "@testing-library/react";
import AddPriceListModal from "./AddPriceListModal";
import {user} from '@testing-library/user-event';
import PriceList from "./PriceList";
import {getPriceDetails} from "./service/priceListService"

jest.mock("./service/priceListService", () => ({
    getPriceDetails : jest.fn(),

}));

describe("Basic Rendering of AddPricelistModal" ,() => {
    const open = true;
    const onClose = jest.fn();
    it("Should display the title" ,() => {
        const modalComponent = render(<AddPriceListModal open = {open} onClose ={onClose} editModal={false}/>);

        expect(screen.getByText("Add a New Price List")).toBeInTheDocument();
    });

    // it("Should render the form component" , () => {
    //     const modalComponent = render(<AddPriceListModal open = {open} onClose ={onClose} editModal={true}/>);

    //     const formComponent = modalComponent.getByTestId('form');

    //     expect(formComponent.length).toBe(4)
    // })

    it("it has three required fields" , async() => {
        const loginComponent = render(<AddPriceListModal open = {open} onClose ={onClose} editModal={true}/>);
        
        const productNameInput =  loginComponent.getByTestId('productname-input');
        const categoryInput = loginComponent.getByTestId('category-input');
        const priceInput = loginComponent.getByTestId('price-input');
        const Submit = loginComponent.getByText('Submit');

        expect(productNameInput).toBeInTheDocument();
        expect(categoryInput).toBeInTheDocument();
        expect(priceInput).toBeInTheDocument();
        expect(Submit).toBeInTheDocument();
    });
    // it('it should add a new product to the price list and refresh the page', async () => {
    //     // Render your component that contains the price list table and "Add to List" button
    //     const { container } = render(<PriceList/>);
      
    //     // Find and click the "Add to List" button to open the modal
    //     const addToListButton = screen.getByText('Add New List');
    //     fireEvent.click(addToListButton);
      
    //     // Find and fill out the form inputs within the modal
    //     const productNameInput = screen.getByTestId('productname-input').querySelector('input');;
    //     const categoryInput = screen.getByTestId('category-input').querySelector('input');;
    //     const productPriceInput = screen.getByTestId('price-input').querySelector('input');;
        
    //     fireEvent.change(productNameInput, { target: { value: 'New Product' } });
    //     fireEvent.change(categoryInput, { target: { value: 'Dairy'} });
    //     fireEvent.change(productPriceInput, { target: { value: '10.00' } });
      
    //     // Find and click the "Submit" button within the modal to add the new product
    //     const submitButton = screen.getByText('Submit');
    //     fireEvent.click(submitButton);
      
    //     // Check if the new product is added to the price list table
    //     // expect(mockAddProductToBackend).toHaveBeenCalledWith({}); 
    //   });


    // it("it should submit the data" , async() => {
    //     const originalHandleSubmit = AddPriceListModal.prototype.handleSubmit;
    //     AddPriceListModal.prototype.handleSubmit = jest.fn(); 

    //     const loginComponent = render(<AddPriceListModal open = {open} onClose ={onClose} editModal={true}/>);
        
    //     const productNameInput =  loginComponent.getByTestId('productname-input').querySelector('input');
    //     const categoryInput = loginComponent.getByTestId('category-input').querySelector('input');
    //     const priceInput = loginComponent.getByTestId('price-input').querySelector('input');
    //     const Submit = loginComponent.getByText('Submit');

    //     fireEvent.change(productNameInput, { target: { value: 'New Product' } });
    //     fireEvent.change(categoryInput, { target: { value: 'Dairy'} });
    //     fireEvent.change(priceInput, { target: { value: '10.00' } });

       

    // });
})