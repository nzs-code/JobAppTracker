
# JobAppTracker

JobAppTracker is a job application tracker built for Datacom by Nathan Stocking.
It's built with an ASP.NET Core 8 LTS Web API backend and ReactJS v19 frontend.

This project will help users manage their job applications by allowing them to add, update
and view details like company name, position, application status, and date applied.

## Features

- **Backend**
  - RESTful API endpoints:
    - GET /applications - Retrieve all job applications.
    - GET /applications/{id} - Retrieve a specific application.
    - POST /applications - Add a new application.
    - PUT /applications/{id}/status - Update the status of an application.
    - DELETE /applications/{id} - Delete a specific application.
  - Built with ASP.NET Core Web API.
  - Use Entity Framework Core (Code First) with SQLite to store data.
  - Implements Repository Pattern and Dependency Injection.
  - Implements Swagger UI for API documentation

- **Frontend**
  - User Interface is built with ReactJS v19
  - Has a simple UI that allows users to:
    - List all job applications.
    - Add a new application.
    - Update an application (e.g. Update status to Applied/Interview/Offer/Rejected).
  - Utilizes Axios for API communication.
  - Displays a table with the following columns:
    - Company Name
    - Position
    - Status
    - Date Applied
    - Actions (Edit)
  - Implements a dropdown menu for updating job status.
  - Features pagination for the table.

## Getting started

### Prerequsities

- [.NET 8.0.407 SDK LTS] (https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node JS LTS v22.14] (https://nodejs.org/en/download)
- [ReactJS v19] (https://reactjs.org/)
- [Visual Studio Code] (https://code.visualstudio.com/)

## Installation Instructions

### Prepare Files

1. **Unpack the provided .zip file in your desired location.**

### Backend Setup

1. **Open a terminal in the unpacked .zip files root folder:**

2. **Navigate to the JobAppTracker.API Folder:**
   ```bash
   cd ./JobAppTracker.API
3. **Restore Dependencies:**
   ```bash
   dotnet restore
4. **Install Required NuGet Packages**
   ```bash
   dotnet add package Microsoft.EntityFrameworkCore.Sqlite
   dotnet add package Microsoft.EntityFrameworkCore.Tools
   dotnet add package Swashbuckle.AspNetCore
5. **Install EF CLI globally (if not already installed):**
   ```bash
   dotnet tool install --global dotnet-ef
   note: Restart the terminal after this command before continuing.
6. **Trust HTTPS Development Certificate:**
   ```bash
   dotnet dev-certs https --trust
   notes:
   +  If prompted, allow the certificate to be trusted. 
   +  After running, restart Chrome for the trust to take effect.
7. **Apply Database Migrations:**
   ```bash
   dotnet ef migrations add InitialCreate
   note: If InitialCreate has already been used, choose a different name
8. **Update the Database:**
   ```bash
   dotnet ef database update

#### Frontend Setup

1. **Open a terminal in the unpacked .zip files root folder.**

2. **Navigate to the jobapptracker.ui folder:**
   ```bash
   cd ./jobapptracker.ui
3. Install Dependencies:
   ```bash
   npm install
4. Install Axios for API Communication:
   ```bash
   npm install axios

## How to Run

### Backend

1. **Open a terminal and navigate to the API folder:**
   ```bash
   cd ./JobAppTracker.API

2. **Run the API:**
   ```bash
   dotnet run

3. **Access the API or Swagger UI:**
   The API will run on https://localhost:5001.
   Swagger API Documentation will run on https://localhost:5001/swagger.

### Frontend

1. **Open a terminal and navigate to the UI folder:**
   ```bash
   cd ./jobapptracker.ui

2. **Run the Frontend:**
   ```bash
   npm start

3. **Access the Frontend:**
The Frontend will run on http://localhost:3000.

### Assumptions:

+ CORS is configured to allow calls from http://localhost:3000.
+ A PUT endpoint (/applications/{id}/status) was required to update the application status.
+ A DELETE endpoint was required to allow removal of job applications.
+ The frontend table automatically refreshes after adding or editing an application.
+ Logging is implemented throughout the repository for error handling and troubleshooting.
+ The "Date Applied" field accepts dates only between two years ago and today, and displays the date in DD/MM/YYYY format.

License

This project is for educational and technical assessment purposes.

Contact

If you have any questions or issues, please email me at [enstocking@gmail.com].