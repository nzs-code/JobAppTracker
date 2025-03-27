
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
  - Built with ASP.NET Core Web API.
  - Use Entity Framework Core (Code First) with SQLite to store data.
  - Implements Repository Pattern and Dependency Injection.
  - Implements Swagger UI for API documentation

- **Frontend**
  - User Interface which is built with ReactJS v19
  - Has a simple UI that allows users to:
    - List all job applications.
    - Add a new application.
    - Update an application (e.g., update status to Interview/Offer/Rejected).
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

- [.NET 8 SDK LTS]
- [ReactJS v19]
- [Visual Studio Code]

### Installation instructions

#### Backend Setup

1. **Navigate to the Backend Folder:**
   ```bash
   cd JobAppTracker/Backend
2. **Restore Dependencies:**
   ```bash
   dotnet restore
3. **Install Required Packages**
   ```bash
   dotnet add package Microsoft.EntityFrameworkCore.Sqlite
   dotnet add package Microsoft.EntityFrameworkCore.Tools
   dotnet add package Swashbuckle.AspNetCore
4. **Apply Database Migrations:**
   ```bash
   dotnet ef migrations add InitialCreate
   dotnet ef database update
5. **Run the API:**
   ```bash
   dotnet run

The API will run on https://localhost:5001.
Swagger Documentation will run on https://localhost:5001/swagger.

#### Frontend Setup

1. Navigate to the Frontend Folder:
   ```bash
   cd JobAppTracker/Frontend
2. Install Dependencies:
   ```bash
   npm install
3. Install Axios for API Communication:
   ```bash
   npm install axios
4. Start the Development Server:
   ```bash
   npm start

The Frontend will run on http://localhost:3000.

### NOTES:

+ None yet

License

This project is for educational and technical assessment purposes.

Contact

If you have any questions or issues, please email me at [enstocking@gmail.com].