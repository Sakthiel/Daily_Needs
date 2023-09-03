import React from "react";
import { render ,waitFor} from "@testing-library/react";
import Footer from "./Footer";
import {getVersionDetails} from "./service/footerService";
import { when } from "jest-when";

jest.mock("./service/footerService", () => ({
    getVersionDetails : jest.fn(),

}));





describe("Basic rendering of the footer component" , () => {
  it("Should display the version information" , async () => {

    when(getVersionDetails).calledWith().mockReturnValue({data : {CurrentVersion : "v2"}});
    
   

      const footer = render(<Footer/>);
         
      const versionElement = footer.getByTestId("version");
        await waitFor(() => {
        expect(versionElement).toHaveTextContent("Current Version : v2")
        });
    
  })
})