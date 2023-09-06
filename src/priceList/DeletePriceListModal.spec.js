import React from "react";
import {fireEvent, render , screen , waitFor} from "@testing-library/react";
import DeletePriceListModal from "./DeletePriceListModal";
import { Button } from "@material-ui/core";

describe("Basic rendering and Funtionality" , () => {
    const open = true;
    const onClose = jest.fn();
    const handleDelete = jest.fn();
    const index = 1;
    it("Should display the title , message , button" , () =>{
            const deleteModal=  render(<DeletePriceListModal open={open} onClose = {onClose} handleDelete={handleDelete}/>)

            expect(screen.getByText("Confirm Deletion")).toBeInTheDocument();
            expect(screen.getByText("Are you sure you want to delete this item?")).toBeInTheDocument();
            expect(screen.getByText("Cancel")).toBeInTheDocument();
            expect(screen.getByText("Delete")).toBeInTheDocument();
    });

    it("Proceed Delete operation When delete button is clicked" , () => {
        const deleteModal=  render(<DeletePriceListModal open={open} handleClose= {onClose} handleDelete={handleDelete} index = {index}/>)
        const deleteButton = deleteModal.getByText('Delete');

        fireEvent.click(deleteButton);

        expect(handleDelete).toHaveBeenCalledWith(1);
    })

})