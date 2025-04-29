# RegistrationForm

This project demonstrates the implementation of a dynamic HTML5 registration form with real-time validation using JavaScript. The form gathers user information, validates the input fields to meet specified requirements, and, upon successful completion, sends the collected data to your personal email address.

Features

1. Field Requirements & Validation
Name: Requires a first and last name (two text boxes). Fields include default placeholder text that clears when selected. Accepts only alphabetical characters.
Address: Collects mailing address using three separate fields: city, state, and ZIP code.
ZIP code: Numeric-only input (5 digits).
City: Alphabetic characters only.
State: Selectable from a dropdown menu.
Phone Number: Consists of two fields:
Area code: Exactly 3 digits.
Phone number: Exactly 7 digits.
Email Address:
Validates standard email conventions (e.g., name@domain.extension).
Provides real-time error messages for invalid formats.
Confirm Email Address: Checks that the confirmation matches the original email. Displays an error message if they don’t match.
Meal Preference: Requires selecting one from a radio button list (Vegan, Vegetarian, Non-Vegetarian).
Contact Method: At least two contact methods must be selected from a list of four. Displays an error if fewer than two are selected.
Comments: Optional field for additional comments, limited to 250 characters. Displays a remaining character count dynamically.

2. Form Buttons
Submit: Validates all fields and displays error messages for invalid inputs. Prevents submission until all errors are resolved. Sends the data to the specified email address upon successful validation.
Reset: Clears all form fields and resets them to their default state.
3. Interactive Elements
Real-time input validation and feedback for required fields.
Dynamic character count for comments.
Smooth scrolling to navigate to invalid fields during form submission.

File Overview

index.html: The HTML structure of the registration form.
style.css: Stylesheet for form layout and design.
script.js: JavaScript logic for input validation and interactivity. Technology Stack
HTML5: For semantic markup and structure.
CSS3: For user-friendly styling.
JavaScript: For form validation and functionality.
