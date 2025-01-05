# QuickLink: Node.js URL Shortener

QuickLink is a beginner-friendly project designed to help you understand how to build a URL shortener using **Node.js**, **Express**, and **MongoDB**. This project demonstrates the use of various technologies and concepts to create a scalable and efficient web application.

---

## Prerequisites
Before diving into the project, you should have a basic understanding of the following skills and technologies:

### Skills to Learn
- **JavaScript**: Fundamentals of programming and working with asynchronous code.
- **Node.js**: Basics of building backend applications.
- **Express**: How to create APIs and manage routing.
- **MongoDB**: Understanding of NoSQL databases and basic CRUD operations.
- **Git**: Version control basics to manage your codebase.

### Technologies Used
- **Node.js**: JavaScript runtime for building server-side applications.
- **Express**: Framework for handling routing and middleware.
- **MongoDB**: Database for storing URL data and tracking visit history.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB in Node.js.
- **ShortID**: Library for generating unique short IDs.

---

## Installation

### Prerequisites
Ensure you have the following installed on your system:
- **Node.js** (v14 or later)
- **MongoDB** (running locally or via a cloud service like MongoDB Atlas)
- **Git**

### Steps to Run the Project

1. **Clone the Repository**
   ```bash
   git clone https://github.com/HemanthKuttuboyina/Node.js-URL-Shortener.git
   cd Node.js-URL-Shortener
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root directory with the following:
   ```env
   PORT=8001
   MONGO_URI=mongodb://127.0.0.1:27017/URLShorter
   BASE_URL=http://localhost:8001
   ```

4. **Start MongoDB**
   Ensure MongoDB is running locally or connected via a cloud provider.

5. **Run the Application**
   ```bash
   npm start
   ```
   The server will run on `http://localhost:8001` by default.

---

## Project Modules and Libraries

### **index.js** (Main Application File)
- Sets up the Express app.
- Connects to MongoDB using `connectToMongoDB` function.
- Defines the main routes, including `/url` for API interactions and `/:shortID` for redirection.
- Listens on the specified port for incoming requests.

### **connect.js** (Database Connection)
- Uses `mongoose` to connect to MongoDB.
- Handles connection setup and logging for successful database connection.

### **routes/url.js** (Router)
- Defines the `/url` endpoint to handle POST requests for generating short URLs.
- Delegates request handling to the controller.

### **controller/url.js** (Controller)
- Manages the core logic for creating short URLs.
- Uses the `shortid` library to generate unique short IDs.
- Saves the short URL, original URL, and visit history to the database.

### **models/url.js** (Model)
- Defines the `url` schema using Mongoose.
- Includes fields for `shortID`, `redirectURL`, and `visitHistory`.
- Utilizes Mongoose's `timestamps` option to track creation and update times.

---

## How It Works

1. **Shorten a URL**
   - Endpoint: `POST /url`
   - Request Body:
     ```json
     {
       "url": "https://example.com"
     }
     ```
   - Response:
     ```json
     {
       "id": "generatedShortID"
     }
     ```

2. **Redirect to Original URL**
   - Endpoint: `GET /:shortID`
   - Automatically redirects to the original URL and logs the visit timestamp.

3. **Visit Tracking**
   - Each redirection updates the `visitHistory` field in the database with a timestamp.

---

## Project Structure
```
Node.js-URL-Shortener/
├── models/
│   └── url.js           # URL schema for MongoDB
├── controller/
│   └── url.js           # Core logic for handling URL shortening
├── routes/
│   └── url.js           # Routes for API endpoints
├── connect.js           # MongoDB connection setup
├── index.js             # Main application entry point
├── package.json         # Node.js dependencies
└── README.md            # Project documentation
```

---

## Key Libraries and Their Purpose

- **Express**: Simplifies routing and middleware.
- **Mongoose**: Connects to MongoDB and manages schemas and models.
- **ShortID**: Generates unique IDs for short URLs.

---

## Contributing
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

---

## License
This project is licensed under the [MIT License](LICENSE).

---

## Contact
For inquiries or feedback, reach out via:
- **GitHub**: [HemanthKuttuboyina](https://github.com/HemanthKuttuboyina)
- **Email**: [hemanthkuttuboyina@gmail.com]

Happy Coding! 🚀

