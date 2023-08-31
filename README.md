# ui-assignments

# Drag-and-Drop Task Board

This project is a Single Page Application (SPA) built using React and Vite, and it integrates with the Mock API.

## Getting Started

## Installation

Follow the instructions below to set up and run the project locally:

1. Clone the repository:

```
git clone https://github.com/Virendra41/ui-assignments.git
```

2. Navigate to the project directory

```
cd ui-assignments
```

3. Install the dependencies:

```
yarn install
```

## Technologies Used

The following technologies were used to build this project:

- [React](https://reactjs.org/): A JavaScript library for building user interfaces.

- [Vite](https://vitejs.dev/): A build tool that focuses on speed and simplicity.

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript): The programming language used to build the application's logic.

- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML): The markup language used to build the application's UI.

- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS): The style sheet language used to style the application's UI.

- [Sass](https://sass-lang.com/): A CSS preprocessor that enables the use of variables, mixins, and more.

## Libraries Used

- axios: A promise-based HTTP client for making HTTP requests.
- jotai: A simple and efficient state management library for React.
- moment: A library for parsing, formatting, and manipulating dates and times.
- react: The core React library.
- react-dnd: Drag-and-drop for React.
- react-dnd-html5-backend: The HTML5 backend for React DnD.
- react-dom: The entry point to the DOM and server rendering for React.
- react-hot-toast: A minimal and responsive toast notification library for React.
- react-router-dom: Declarative routing for React.
- react-select: A flexible and customizable select component for React.
- sass: A CSS extension language that allows you to use variables, nesting, and more in your styles.
- sass-lint: A linter for Sass/SCSS style sheets.

## Configuration

Before running the application, you need to configure the API endpoint. Follow the steps below:

1. Open the .env file in the project root directory.
2. Replace the value of the VITE_API_URL variable with the desired Mock API URL. For example:

```
VITE_APP_API=https://64ed78a8f9b2b70f2bfb89df.mockapi.io/
```

3. Save the file.

## Usage

To start the application, run the following command:

```
yarn dev
```

This will launch the development server and open the application in your default browser. If it doesn't open automatically, you can visit http://localhost:3000 in your browser.

### Building for Production

To build the application for production, run the following command:

```
yarn build
```

This will create an optimized and minified version of the application in the dist directory.

You can then deploy the contents of the dist directory to a static file server or a hosting service of your choice.

## Notes

- Feel free to customize the application's UI, styles, and components as per your preferences and requirements.

That's it! You should now have the Drag-and-Drop Task Board React app with Vite up and running locally.

Have fun building your Drag-and-Drop Task Board and happy coding!
