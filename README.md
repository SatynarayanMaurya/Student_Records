# Student Record Management System

This is a student record management website built with **React.js** and **Firebase**. The website provides an **admin panel** where an authorized admin can manage student records securely. Users without login access cannot view the homepage, ensuring that sensitive information is protected.

## Features

- **Secure Authentication**: Only admins can log in to the system and manage student data.
- **View All Student Records**: Admins can view a list of all student details on the homepage.
- **Add New Students**: Admins can add new student records to the database.
- **Update Student Data**: Admins can update existing student information.
- **Delete Student Records**: Admins can delete student records from the database.
- **Firebase Database**: All student records are stored securely in Firebase's real-time database.

## Technologies Used

- **React.js**: Frontend library to build the user interface.
- **Firebase**: Real-time NoSQL database to store and manage student records.
- **React Router**: For routing and navigation.
- **Firebase Authentication**: For secure login and authentication of the admin.
- **Tailwind CSS**: For styling (can be customized further).

## Setup Instructions

### Prerequisites


- **Firebase Account**: You will need a Firebase account to set up a Firebase project. You can sign up at [Firebase](https://firebase.google.com/).

### Steps to Set Up Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/SatynarayanMaurya/Student_Records.git

2. **Navigate into the project directory:**:
   ```bash
   cd student-record-website

3. **Install dependencies:**:
   ```bash
   npm install
4. **Run the project:**:
   ```bash
   npm start
