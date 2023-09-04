import { FormControl } from "@material-ui/core";
import { render ,waitFor} from "@testing-library/react";
import Login from "./Login";
import {shallow , mount} from "enzyme";
import {BrowserRouter as Router} from "react-router-dom";
 describe("Basic Rendering" , () => {
    const testOnLogin = jest.fn();
    const testHandleLogin = jest.fn();
    it("should render login form if not authenticated" , () =>{
        const loginComponent = render(<Router> <Login isAuthenticated={false} onLogin={testOnLogin}/></Router>);
        const formComponent = loginComponent.getByTestId("form");

        expect(formComponent.length).toBe(3);
    })
})