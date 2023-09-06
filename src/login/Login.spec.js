import { FormControl } from "@material-ui/core";
import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import Login from "./Login";
import Home from "../home/Home";
import { shallow, mount } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";
import authService from "../helper/authService"
import { login } from "../helper/authService";
import { when } from "jest-when";
import useAuth from "../layout/hooks/useAuth";
import { MemoryRouter, Route ,Routes} from 'react-router-dom';

jest.mock("../helper/authService", () => ({
    isLoggedIn: jest.fn(),
    login: jest.fn(),
    logout: jest.fn()
}));

jest.mock("../layout/hooks/useAuth", () => ({
    __esModule: true,
    default: jest.fn()
}));
// jest.mock('./Login', () => {
//     return {

//       default: () => {
//         return {
//           handleSubmit: jest.fn(),
//         };
//       },
//     };
//   });
describe("Basic Rendering", () => {
    const testOnLogin = jest.fn().mockResolvedValue({ userDetails: 'user details' });;
    const testHandleLogin = jest.fn();

    it("should render login form if not authenticated", () => {
        const loginComponent = render(<Router> <Login isAuthenticated={false} onLogin={testOnLogin} /></Router>);

        const userNameInput = loginComponent.getByTestId('username-input');
        const passwordInput = loginComponent.getByTestId('password-input');
        const loginButton = loginComponent.getByText('Submit');

        expect(userNameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(loginButton).toBeInTheDocument();
    })

    // test('handles form submission', async () => {
    //     const { getByTestId, getByText } = render(<Router> <Login isAuthenticated={false} onLogin={testOnLogin}/></Router>);
    //     when(login).calledWith('Shop_Owner', 'Owner').mockResolvedValue("userDetails");

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
    //     await waitFor(() => {
    //         expect(testHandleLogin).toHaveBeenCalledWith('Shop_Owner' , 'Owner');

    //   });
    test('handles form submission', async () => {
        const Home = () => <div>Home Page</div>;

        const { container , getByTestId ,getByText} = render(
            <MemoryRouter initialEntries={['/login']}>
                <Routes>
                <Route path="/login" element = {<Login isAuthenticated={false} onLogin={testOnLogin}/>} />
                <Route path="/home" element = {<Home/>} />
                </Routes>
            </MemoryRouter>
        );
        when(login).calledWith('Shop_Owner', 'Owner').mockResolvedValue("userDetails");

        const usernameInput = getByTestId('username-input').querySelector('input');
        const passwordInput = getByTestId('password-input').querySelector('input');
        const loginButton = getByText('Submit');

        // Simulate user input
        fireEvent.change(usernameInput, { target: { value: 'Shop_Owner' } });
        fireEvent.change(passwordInput, { target: { value: 'Owner' } });

        // Simulate form submission
        fireEvent.click(loginButton);

        // Add your assertions for form submission logic (e.g., checking if a function is called)
        // await waitFor(() => {
        //     expect(screen.getByText("Home Page")).toBeInTheDocument();

        //     });
        // const homePageText = screen.getByText('Home Page');
        // expect(homePageText).toBeInTheDocument();
        expect(testOnLogin).toHaveBeenCalledWith("Shop_Owner", "Owner");
    });
});