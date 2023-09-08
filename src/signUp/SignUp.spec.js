import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SignUp from './SignUp'; 
import { BrowserRouter as Router } from "react-router-dom";

describe('basic functionality of sign up component' ,() => 
{
    it('renders Sign Up page with form elements', () => {
    render(<Router> <SignUp /></Router>);
    
    // Check if the Sign Up page title is rendered
    // const pageTitle = screen.getByText('Sign Up', { selector: 'div.MuiTypography-root' });
    // expect(pageTitle).toBeInTheDocument();
  
    // Check if form elements are rendered
    const nameInput = screen.getByTestId('name-input');
    const usernameInput = screen.getByTestId('username-input');
    const passwordInput = screen.getByTestId('password-input');
    const phoneNumberInput = screen.getByTestId('phonenumber-input');
    const emailInput = screen.getByTestId('email-input');
    const submitButton = screen.getByTestId('button');
    
    expect(nameInput).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(phoneNumberInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

  });
  it('submits the form with valid data', () => {
    render(<Router> <SignUp /></Router>);
   
    const nameInput = screen.getByTestId('name-input').querySelector('input');
    const usernameInput = screen.getByTestId('username-input').querySelector('input');
    const passwordInput = screen.getByTestId('password-input').querySelector('input');
    const phoneNumberInput = screen.getByTestId('phonenumber-input').querySelector('input');
    const emailInput = screen.getByTestId('email-input').querySelector('input');
    const submitButton = screen.getByTestId('button');

    // Fill in valid data
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(usernameInput, { target: { value: 'johndoe' } });
    fireEvent.change(passwordInput, { target: { value: 'secure123' } });
    fireEvent.change(phoneNumberInput, { target: { value: '1234567890' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
  
    // Mock preventDefault for the form submission event
    const mockPreventDefault = jest.fn();
    const form = screen.getByTestId('signup-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault = mockPreventDefault;
    });
  
    // Trigger form submission
    fireEvent.click(submitButton); 
  
    // Assert that preventDefault was called
    expect(mockPreventDefault).toHaveBeenCalled();
  });
})

  