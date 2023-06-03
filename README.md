# Project Documentation

This README provides an overview of the project and its components.

## React Application Entry Point

- Sets up the routing for different pages of the application using React Router.
- Renders a `Router` component from the `react-router-dom` library.
- Defines routes for different paths using the `Route` component.
- Renders the `LandingPage`, `Signup`, `Login`, and `Welcome` components for their respective routes.
- Imports a CSS file for styling.

## Express.js Server Setup

- Sets up a server using Express.js.
- Imports the required dependencies: `express`, `cors`, `bcrypt`, `db`, and `User` modules.
- Uses the Express middleware `cors` for handling cross-origin resource sharing.
- Uses the `express.json` middleware for parsing JSON data.
- Defines two POST endpoints: `/api/register` and `/api/login` for registering and logging in users, respectively.
- Defines a GET endpoint `/api/getToken` for generating a JWT token.
- Listens on port `3001` for incoming requests.

## SignUpForm Component

- React component representing a sign-up form.
- Uses the `useState` hook to manage form state.
- Uses the `axios` library to make API requests.
- Renders a form with input fields for email, password, and role.
- Includes form validation and error handling.
- Sends a POST request to the `/api/register` endpoint on form submission to register the user.
- Stores the JWT token in local storage.

## LoginForm Component

- React component representing a login form.
- Similar to the SignUpForm component but handles user login.
- Uses the `useState` hook for form state management.
- Uses the `axios` library for API requests.
- Sends a POST request to the `/api/login` endpoint on form submission to log in the user.
- Stores the JWT token in local storage on successful login.
- Redirects the user to the `WelcomePage` component.

## MongoDB Database Connection

- Sets up the MongoDB database connection using Mongoose.
- Imports the `mongoose` module.
- Establishes a connection to the MongoDB server running on localhost at port `27017`.
- Exports the database connection object for use in other modules.

## User Model and Schema

- Defines the User schema and creates the User model using Mongoose.
- Imports the `mongoose` module.
- Defines a `userSchema` with email, password, and role fields.
- Creates the User model based on the schema.
- Exports the User model for use in other modules.

## WelcomePage Component

- React component representing the WelcomePage of the application.
- Allows the user to upload a file using the HTML file input element.
- Uses the `useState` hook to manage the file state.
- Uses the `firebase` and `axios` libraries for file upload and API requests, respectively.
- Uploads the file to Firebase Storage using the Firebase Storage API on file selection.
- Sends a POST request to the server using the `axios` library.
- Includes error and success message handling.

Note: The code assumes the presence of certain dependencies, such as React, React Router, Express, Mongoose, Firebase, and Axios, which should be installed and configured properly for the code to work as expected.

## Video Demo Link
https://drive.google.com/file/d/1tcjT9nW4WBNuLAukSKCoCTaZlBmOywIL/view?usp=sharing

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
