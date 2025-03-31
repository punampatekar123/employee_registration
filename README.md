# employee_registration
Employee Registration Form in React, Typescript and Fluent UI 8


Building and running the app
In the project directory, you can run:

npm run dev

Runs the app.
Open http://localhost:5173/ to view it in the browser.

Technical Documentation 

Component: RegistrationForm

RegistrationForm is a React functional component built with TypeScript and Fluent UI that renders an employee registration form. 
The form collects user details and navigates to a confirmation page upon successful submission.

1) Imports

React, useEffect, useState - Core React hooks and types.

useNavigate - Navigation hook from react-router-dom for redirecting after form submission.

	Fluent UI Components:

		TextField – Input fields for text.

		PrimaryButton – Main submit button.

		Dropdown – Select dropdown for departments.

		MessageBar – Displays error messages.

		Stack – Fluent UI layout for spacing.

		mergeStyles – To apply custom styles.

		UsersIcon - Icon from lucide-react for header decoration.

		IEmployee - Interface type definition for form data.

2) State Variables
departments: IDropdownOption[]

Stores department options for the dropdown.

Fetched via API on component mount.

error: string

Stores error messages displayed in MessageBar.

formData: IEmployee

Stores the form data values.

Properties:

firstName: First name of the employee.

lastName: Last name of the employee.

employeeNumber: Employee number (validated to be 6 digits).

department: Selected department from the dropdown.

businessJustification: Business justification text.

isLoading: boolean

Indicates whether the department data is being fetched.

3) API Integration
	fetchDepartments (Async Function)
	Fetches department data from the API (https://8e72f048a1dc438998718e1ee90f2960.api.mockbin.io/).

	Maps the response to IDropdownOption[] format.

	Handles errors gracefully with a fallback message.

4) Form Validation
	validateForm (Function)
	Checks for required fields (firstName, lastName, department, businessJustification).

	Validates employeeNumber to be exactly 6 digits (/^[0-9]{6}$/ regex).

	Ensures businessJustification length does not exceed 255 characters.

5) Form Submission
	handleSubmit (Event Handler)
	Prevents default form submission.

	Validates form data before navigating to the confirmation page.

6) UI Components & Layout
	Header Section

	Icon (UsersIcon) with title and description.

	Styled with Tailwind and custom classes.

	Form Section

	Stack used for consistent spacing between form elements.

	Error messages shown using MessageBar (error state).

	Form Fields

	TextField for firstName, lastName, and employeeNumber.

	Dropdown for department (fetched from API).

	TextField with multiline for businessJustification.

	Submit Button

	Styled PrimaryButton with disabled state while loading.

7) Form Fields & Bindings
	Each form field is controlled by formData with onChange handlers.

8) Styling
	mergeStyles is used to apply custom width to TextField.

	PrimaryButton has inline styles for background, padding, and font.

9) Navigation
	useNavigate redirects to /confirmation on successful submission.

	state is passed to the confirmation page for displaying submitted data.

10) Error Handling
	Errors displayed through MessageBar with MessageBarType.error.

	Fallback error for API failure to load departments.

Component: Confirmation
1)  Overview
	Confirmation is a React functional component that displays a confirmation page after successful form submission. It uses Fluent UI’s DetailsList to display the submitted employee data and provides a button to navigate back to the registration form.

2) Imports
	React – Core React functionality.

	useLocation, useNavigate – Hooks from react-router-dom for accessing navigation and state.

	Fluent UI Components:

		Stack – Provides vertical/horizontal layout and spacing.

		Text – Displays styled text.

		PrimaryButton – Button to navigate back to the registration form.

		DetailsList – Displays submitted form data in a structured format.

		DetailsListLayoutMode – Specifies layout mode for DetailsList.

		IColumn – Type for defining columns in DetailsList.

		CheckCircle – Lucide React icon for successful submission.

		IEmployee – Interface for form data imported from ../types.

3) State and Hooks
	location: useLocation

	Retrieves the state passed via navigate() from the RegistrationForm.

	Accesses form data (formData) through location.state.

	navigate: useNavigate

	Navigates between routes in the application.

	formData: IEmployee

	Stores the submitted form data passed from the RegistrationForm.

	If formData is not present (e.g., if the user directly visits /confirmation), redirects to the registration form (/).

4)  Form Data Validation
	If formData is not available in location.state, the component:

	Redirects to / using navigate('/').

	Returns null to prevent rendering.

5) DetailsList Configuration
  
	Defines the columns displayed in the DetailsList.

	Each column has:

	key – Unique identifier.

	name – Column header name.

	fieldName – Property name from the items array.

	minWidth and maxWidth – Defines the column width.

	isResizable – Allows resizing the column.

	isMultiline – Enables multiline display (for larger text).

	Array of objects representing the data to be displayed in DetailsList.

	Each object contains:

	key – Unique identifier.

	field – Field name.

	value – Corresponding value from formData.

6) UI Structure and Layout
		1) Header Section

		Displays the success icon (CheckCircle) and title.

		Styled with Tailwind CSS.

		2) Confirmation Message

		Centered text thanking the user for registration.

		3) Details List

		Displays the form data in a tabular format.

		Uses DetailsList with DetailsListLayoutMode.justified for flexible width.

		4) Back to Registration Button

		Styled PrimaryButton navigates back to /registration.

7) Navigation
	navigate('/') – Redirects to the registration form if formData is not found.

	navigate('/registration') – Takes the user back to the registration form on button click.

8) Styling
	Tailwind CSS for layout, padding, and background.

	Custom styles for PrimaryButton using Fluent UI’s styles prop.
	
	DetailsList styles:

Summary

1) Displays a confirmation message with the submitted data.
2) Ensures that formData is valid before rendering.
3) Provides a button to return to the registration form.
4) Uses DetailsList for a clean, structured display.

