# Watchdog SvelteKit Frontend

This project is a SvelteKit frontend application for the Watchdog backend. It uses Tailwind CSS for styling, Vite for building, and several other libraries for various functionalities.

## Project Structure

The project is structured into several directories and files, following the SvelteKit conventions. The most important directories are:

- `src`: Contains the source code of the application.
- `src/routes`: Contains the routes of the application.
- `src/lib`: Contains utility functions and components.

## Setup Instructions

To set up the project, follow these steps:

1. Clone the repository to your local machine.
2. Install the dependencies by running npm install.
3. Create a `.env` file at the project root and add the following environment variable:
   - `PUBLIC_SERVER_URL`: The base URL of the Watchdog API (eg. http://localhost:5123/v1)
4. Start the development server by running `npm run dev`.
