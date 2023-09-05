import { FormControl } from "@material-ui/core";
import { render ,waitFor ,fireEvent ,screen} from "@testing-library/react";
import Login from "./Login";
import {shallow , mount} from "enzyme";
import {BrowserRouter as Router} from "react-router-dom";

// jest.mock('./Login', () => {
//     return {
    
//       default: () => {
//         return {
//           handleSubmit: jest.fn(),
//         };
//       },
//     };
//   });
 describe("Basic Rendering" , () => {
    const testOnLogin = jest.fn();
    const testHandleLogin = jest.fn();
   
    it("should render login form if not authenticated" , () =>{
        const loginComponent = render(<Router> <Login isAuthenticated={false} onLogin={testOnLogin}/></Router>);
        
        const userNameInput =  loginComponent.getByTestId('username-input');
        const passwordInput = loginComponent.getByTestId('password-input');
        const loginButton = loginComponent.getByText('Submit');

        expect(userNameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(loginButton).toBeInTheDocument();
    })
    
    // test('handles form submission', async () => {
    //     const { getByTestId, getByText } = render(<Router> <Login isAuthenticated={false} onLogin={testOnLogin}/></Router>);
        
    //     const usernameInput = getByTestId('username-input').querySelector('input');
    //     const passwordInput = getByTestId('password-input').querySelector('input');
    //     const loginButton = getByText('Submit');
        
    //     // Simulate user input
    //     fireEvent.change(usernameInput, { target: { value: 'Shop_Owner' } });
    //     fireEvent.change(passwordInput, { target: { value: 'Owner' } });
        
    //     // Simulate form submission
    //     fireEvent.click(loginButton);
        
    //     // Add your assertions for form submission logic (e.g., checking if a function is called)
    //     // await waitFor(() => {
    //     //     expect(screen.getByText("Home Page")).toBeInTheDocument();
            
    //     //     });
    //   });

})