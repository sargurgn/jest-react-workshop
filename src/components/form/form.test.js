import { render, screen } from "@testing-library/react"
import React from "react"
import Form from "./form"

describe('Tests related to form loading', () => { 
    it('should render the form elements as expected', () => {
        render(<Form />)
        expect(screen.getByLabelText("First Name")).toBeInTheDocument()
        expect(screen.getByLabelText("Last Name")).toBeInTheDocument()
        expect(screen.getByLabelText("Gender")).toBeInTheDocument()
        expect(screen.getByLabelText("Address")).toBeInTheDocument()
    });
 })