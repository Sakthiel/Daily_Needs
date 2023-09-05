import {act, renderHook} from "@testing-library/react-hooks";
import useAuth from "./useAuth";
import { isLoggedIn , login , logout} from "../../helper/authService";
import {when} from "jest-when";

jest.mock("../../helper/authService", () => ({
    isLoggedIn: jest.fn(),
    login: jest.fn(),
    logout: jest.fn()
}));

describe("Basic logic", () => {

    it("should respect user's logged in status initially", () => {
        isLoggedIn.mockReturnValue(true);
        const renderHookResult = renderHook(() => useAuth());
        const {result, waitForNextUpdate} = renderHookResult;
        waitForNextUpdate();  

        const {isAuthenticated} = result.current;
        expect(isAuthenticated).toBe(true);
    });

    it("should login successfuly", async () => {
        const testUsername = "testUsername";
        const testPassword = "testPassword";
        isLoggedIn.mockReturnValue(false);
        const renderHookResult = renderHook(() => useAuth());
        const {result} = renderHookResult;
        when(login).calledWith(testUsername, testPassword).mockResolvedValue("userDetails");

        const {handleLogin} = result.current;

        let userDetails;
        await act(async () => {
            userDetails = await handleLogin(testUsername, testPassword);
        });

        const {isAuthenticated} = result.current;
        expect(userDetails).toBe("userDetails");
        expect(isAuthenticated).toBe(true);
    });

    it("should not login if not authenticated", async () => {
        const testUsername = "testUsername";
        const testPassword = "testPassword";
        isLoggedIn.mockReturnValue(false);
        const renderHookResult = renderHook(() => useAuth());
        const {result} = renderHookResult;
        when(login).calledWith(testUsername, testPassword).mockRejectedValue("unused");

        const {handleLogin} = result.current;

        try {
            await act(async () => {
                await handleLogin(testUsername, testPassword);
                fail("Should not authenticate");
            });
        } catch (e) {
            const {isAuthenticated} = result.current;
            expect(isAuthenticated).toBe(false);
        }
    });

});