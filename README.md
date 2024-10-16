# UI - Chatbot
This is a small react app, showing UI for a chat app which lists down stock from JSON file and renders on the browser as a single page app.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Setup and Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/rak3n/chatbot-app.git
   cd chatbot-app
   ```


2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the application:

   ```sh
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000/` to use the chatbot.

# Docker setup
This app also has a docker file, which allows end user to build an image of this application without caring about `npm installs` via Docker

1. Build image using docker
    ```sh
    docker build -t chatbot-react-app .
    ```
2. Wait for docker to finish building the image
3. serve the image using 
    ```sh
    docker run -p 3000:3000 chatbot-react-app
    ```
4. Open your browser and navigate to `http://localhost:3000/` to use the chatbot.


# Demo Deployed at Vercel
This app is also deployed on https://chatbot-app-zeta.vercel.app/ and is available to use publicly


<br>

# Assumptions Made
- As this is a chat application, I have implemented functionality to automatically scroll to the bottom of the chat screen whenever a new message is added to the activity.
- I've observed that in chat applications, previous inputs usually remain accessible, so I retained the click listeners to allow users to select from earlier inputs as well.
- I included checks for empty stock exchanges or empty stocks within an exchange. I assume that the data for stocks will be validated before being sent to the UI components from the network/API layer.
- The activity list of the chat is a large array that grows as new chats are added; in a real-world scenario, it should be paginated to a reasonable limit.