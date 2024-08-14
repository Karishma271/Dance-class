# FeelDance

Feel Dance Website is a web application that allows users to browse different dance styles, find nearby dance studios, stay updated with trending dance routines, and more. This project is built with Node.js, Express.js, and integrates with various APIs for enhanced functionality.

## Features

- **Browse Dance Styles and Classes**: The website is fully responsive and works well on all devices.
- **Find Nearby Studios**: Get inspired by popular and trending dance routines.
- **Trending Dance Videos**: Stay updated with the latest dance trends through YouTube video feeds.
- **Discover Dance Routines**: Get inspired by popular and trending dance routines.
- **Responsive Design**: The website is fully responsive and works well on all devices.


## Installation

1. Clone the repository:
2. Install the required dependencies:

    ```sh
    npm i
    ```

3. Create a `.env` file in the root directory and add your environment variables.
   
4. Run the app

    ```sh
    npm run dev
    ```
      
## Usage

1. Start the application:

    ```sh
    npm start
    ```

2. Open your browser and navigate to `http://localhost:3000`.

## Environment Variables

Create a `.env` file in the root directory of your project and add the following variables:

```plaintext
YOUTUBE_API_KEY=your_youtube_api_key
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
PORT=3000
```

## How to Use

1. **Visit the Home Page:**
   - Open your browser and navigate to [http://localhost:3000](http://localhost:3000).
   - On the home page, you can browse through different dance styles and classes.

2. **Find Nearby Studios:**
   - Use the provided search functionality to enter your location.
   - Click the "Find Studios" button to locate dance studios near you using the Google Maps API.
   - A map will be displayed showing the locations of nearby dance studios.

3. **Explore Trending Dance Videos:**
   - Navigate to the "Videos" section via the menu.
   - Watch trending dance videos, which are fetched using the YouTube API.

4. **Learn More About Us:**
   - Visit the "About" page to get more information about the website, the team, or the mission.

5. **Contact Us:**
   - Use the "Contact" page to send a message or inquiry through a contact form.

## API

YouTube API: Used for fetching the current trending dance videos. Learn more at https://developers.google.com/youtube/v3.
Google Maps API: Used for locating nearby dance studios. Learn more at  https://developers.google.com/maps/documentation/javascript/get-api-key.
