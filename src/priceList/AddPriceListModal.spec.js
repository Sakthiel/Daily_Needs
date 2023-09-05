import React from "react";
import {fireEvent, render , screen} from "@testing-library/react";
import AddPriceListModal from "./AddPriceListModal";
import {user} from '@testing-library/user-event';

describe("Basic Rendering of AddPricelistModal" ,() => {
    const open = true;
    const onClose = jest.fn();
    it("Should display the title" ,() => {
        const modalComponent = render(<AddPriceListModal open = {open} onClose ={onClose} editModal={false}/>);

        expect(screen.getByText("Add a New Price List")).toBeInTheDocument();
    });

    it("Should display the edit modal title" ,() => {
        const modalComponent = render(<AddPriceListModal open = {open} onClose ={onClose} editModal={true}/>);

        expect(screen.getByText("Edit Price List")).toBeInTheDocument();
    })

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
    }) 
})