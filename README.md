# Pelist

Pelist is an application that allows users to search for movies.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Installation

To run the project, you have three options: using Docker, Docker Compose, or npm.

### Using Docker

Follow these steps:

1. Clone the repository: `git clone https://github.com/ete99/Pelist.git`
2. Navigate to the project directory: `cd Pelist`
3. Build the Docker image: `docker build -t pelist .`
4. Run the Docker container: `docker run -p 3000:3000 pelist`

### Using Docker Compose

Alternatively, you can use Docker Compose to simplify the process. Follow these steps:

1. Clone the repository: `git clone https://github.com/ete99/Pelist.git`
2. Navigate to the project directory: `cd Pelist`
3. Run the Docker Compose command: `docker-compose up --build react-app`

### Using npm

If you prefer to run the project directly with npm, follow these steps:

1. Clone the repository: `git clone https://github.com/ete99/Pelist.git`
2. Navigate to the project directory: `cd Pelist`
3. Install the dependencies: `npm install`
4. Start the application: `npm start`

## Usage

Once the Docker container or npm server is running, you can access the application by opening your web browser and navigating to `http://localhost:3000`. From there, you can search for movies using the provided search functionality.

## License

This project is licensed under the [MIT License](LICENSE).
