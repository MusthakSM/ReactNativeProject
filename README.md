# Simple React Native Application for CodeScale Interview Assesment (GoT Gallary..)

## Video Overview

You can watch the application overview [here](https://drive.google.com/file/d/1yDWR9JFwlTRc0FD2kQpViVbaVYTCD46K/view?usp=sharing).

This is a React Native application that provides user authentication and character listing features, integrating Firebase for authentication and the Thrones API for data.

## Features

1. **User Authentication**: 
   - Users can sign up and sign in using Firebase Authentication.
   - Once logged in, user sessions persist across the application, eliminating the need for repeated logins.

2. **Character Listing**: 
   - The app fetches and displays a list of characters from the [Thrones API](https://thronesapi.com/).
   - Users can navigate through character details with a clean, intuitive design.

3. **Profile Management**: 
   - Users can view their profile information on a dedicated screen (Profile Screen).
   - Users can log out, which redirects them to the "Sign In" screen.

4. **State Management**: 
   - Redux is used for state management, ensuring a seamless user experience and maintaining global application state.

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- React Native development environment set up (follow the [official guide](https://reactnative.dev/docs/environment-setup)).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/MusthakSM/ReactNativeProject.git
   cd ReactNativeProject
   ```

2. Install dependencies:
   
   ```bash
   npm install
   ```

3. Set up Firebase
   - Create a Firebase project and enable Authentication and Firestore Database.
   - Add your Firebase configuration to your app. ('./Firebase/Firebase')

## Running the App

   ```bash
   npm start
   ```

## Usage

- **Sign Up / Sign In**: Users can create an account or log in using their credentials.
- **Character Screen**: Displays a list of characters fetched from the Thrones API.
- **Profile Screen**: Shows user information and allows users to log out.

## Technologies Used

- **React Native**: For building the mobile application.
- **Firebase**: For authentication and database management.
- **Redux**: For state management.
- **Thrones API**: For fetching character data.

## Video Overview

You can watch the application overview [here](https://drive.google.com/file/d/1yDWR9JFwlTRc0FD2kQpViVbaVYTCD46K/view?usp=sharing).