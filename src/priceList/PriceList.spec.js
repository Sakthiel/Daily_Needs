import { shallow } from "enzyme";
import PriceList from "./PriceList";
import { render ,waitFor ,screen ,fireEvent} from "@testing-library/react";
import {Button, TableCell} from "@material-ui/core";
import {getPriceDetails} from "./service/priceListService";
import { when } from "jest-when";

jest.mock("./service/priceListService", () => ({
    getPriceDetails : jest.fn(),

}));

describe("Price List Page Basic Rendering" ,() => {
    const isUserAdmin = jest.fn();
    it("Should display pricelist text" , async() => {

            when(isUserAdmin).calledWith().mockResolvedValue(true);
            render(<PriceList isUserAdmin={isUserAdmin}/>);

            expect(screen.getByText("PriceList")).toBeInTheDocument();
    });

    it("should render a table", () => {
        when(isUserAdmin).calledWith().mockResolvedValue(true);
        render(<PriceList isUserAdmin={isUserAdmin}/>);

        expect(screen.getByTestId("table")).toBeInTheDocument();
    });

    it("should have a add button " ,() => {
        when(isUserAdmin).calledWith().mockResolvedValue(true);
      
        render(<PriceList isUserAdmin={isUserAdmin}/>);
      
        expect(screen.getByText("Add New List")).toBeInTheDocument();
       
    });

    it("should render the column headers" , async() => {
        when(isUserAdmin).calledWith().mockResolvedValue(true);
        render(<PriceList isUserAdmin={isUserAdmin}/>);
        
        expect(screen.getByText('ProductName')).toBeInTheDocument();
        const category = screen.getAllByText('Category').at(0);
        expect(category).toBeInTheDocument();
        expect(screen.getByText('UnitPrice')).toBeInTheDocument();
        expect(screen.getByText('Actions')).toBeInTheDocument();
    });

    it("should render the price details" , async() => {
        when(getPriceDetails).calledWith().mockReturnValue({data : [{id : 1 , productName : "Apple" , category : "Fruit" , unitPrice : 200}]});
        when(isUserAdmin).calledWith().mockResolvedValue(true);

        render(<PriceList isUserAdmin={isUserAdmin}/>);

        await waitFor(() => {
            expect(screen.getByText("Apple")).toBeInTheDocument();
            expect(screen.getByText("Fruit")).toBeInTheDocument();
            expect(screen.getByText("200")).toBeInTheDocument();
            });


    });

    it('renders the select component', () => {
        when(isUserAdmin).calledWith().mockResolvedValue(true);
        render(<PriceList isUserAdmin={isUserAdmin}/>);
    
    // Check that the component renders without errors
    const selectElement =  screen.getByTestId('category-select');
    expect(selectElement).toBeInTheDocument();
    });

    // it('filters table data when a category is selected', async () => {
    //     when(getPriceDetails).calledWith().mockReturnValue({data : [{id : 1 , productName : "Apple" , category : "Fruit" , unitPrice : 200},
    //                                                                 {id:2 , productName : "Rice" , category :" Grains" , unitPrice:100}]});
    //     render(<PriceList/>);
        
    //     // Select the 'All' option from the dropdown
    //     // const selectElement =  screen.getByTestId('category-select');
    //     // fireEvent.click(selectElement);
        
    //     const optionElement = screen.getByRole('button', { name: 'All'});
    //     await waitFor ( () => {
        
    //     fireEvent.click(optionElement);
    //    });
       
    //    await waitFor(() => {
    //     const optionElement = screen.getByRole('button', { name:'Fruit'});
    //     const tableRows = screen.getAllByRole('row');
    //     expect(tableRows).toHaveLength(2);
    //    });
       
      
    //     // Check that the table displays all data
    //      // Number of rows including header
    //   });
})