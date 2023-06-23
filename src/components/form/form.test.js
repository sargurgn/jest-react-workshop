import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import React from "react"
import Form from "./form"
import axios from "axios"

jest.mock("axios")

describe('Tests related to form loading', () => {
    
        // runs before each test
    })

    afterEach(() => {
        // runs after each test
    })

    it('should render the form elements as expected', () => {
        render(<Form />)
        expect(screen.getByLabelText("First Name")).toBeInTheDocument()
        expect(screen.getByLabelText("Last Name")).toBeInTheDocument()
        expect(screen.getByLabelText("Gender")).toBeInTheDocument()
        expect(screen.getByLabelText("Address")).toBeInTheDocument()
    });

    it('should show alert box with error when firstname and lastname is not entered', async() => {
        render(<Form />)
        const spyOnPostCall = jest.spyOn(axios, "post")
        const submitButton = screen.getByTestId("submit")
        fireEvent.click(submitButton)
        expect(screen.getByText(/Error/)).toBeInTheDocument()
        expect(spyOnPostCall).toHaveBeenCalledTimes(0)
        const alertElement = await waitFor(() => screen.getByTestId("alert") , {timeout: 3000})
        expect(alertElement).toBeInTheDocument()
        expect(alertElement).toHaveTextContent('Error')
    })

    it('should show alertbox with success when form is submitted correctly', async() => {
        render(<Form />)
        const spyOnPostCall = jest.spyOn(axios, "post")
        const firstNameElement = screen.getByLabelText("First Name")
        const lastNameElement = screen.getByLabelText("Last Name")
        const genderElement = screen.getByLabelText("Gender")
        const addressElement = screen.getByLabelText("Address")
        fireEvent.change(firstNameElement, { target: {value: "Narasimhan"}})
        fireEvent.change(lastNameElement, { target: {value: "Gopinath"}})
        fireEvent.change(genderElement, { target: {value: "Male"}})
        fireEvent.change(addressElement, { target: {value: "BGL"}})
        const submitButton = screen.getByTestId("submit")

        axios.post.mockResolvedValue({data: {message: "success", rows: 2000}})

        fireEvent.click(submitButton)
        
        // const successText = await waitFor(() => screen.getByText(/Success/) , {timeout: 3000})
        const alertElement = await waitFor(() => screen.getByTestId("alert") , {timeout: 3000})
        expect(alertElement).toHaveTextContent('Success')
        expect(spyOnPostCall).toHaveBeenCalledTimes(1)

    });

    it('should reset the form when Reset button is clicked', () => {
        render(<Form />)
        const firstNameElement = screen.getByLabelText("First Name")
        const lastNameElement = screen.getByLabelText("Last Name")
        const genderElement = screen.getByLabelText("Gender")
        const addressElement = screen.getByLabelText("Address")
        fireEvent.change(firstNameElement, { target: {value: "Narasimhan"}})
        fireEvent.change(lastNameElement, { target: {value: "Gopinath"}})
        fireEvent.change(genderElement, { target: {value: "Male"}})
        fireEvent.change(addressElement, { target: {value: "BGL"}})

        expect(firstNameElement.value).toBe("Narasimhan")
        expect(lastNameElement.value).toBe("Gopinath")
        expect(genderElement.value).toBe("Male")
        expect(addressElement.value).toBe("BGL")

        const resetButtonElement = screen.getByTestId("reset")
        fireEvent.click(resetButtonElement)

        expect(firstNameElement.value).toBe("")
        expect(lastNameElement.value).toBe("")
        expect(genderElement.value).toBe("None")
        expect(addressElement.value).toBe("")

    })
 })
