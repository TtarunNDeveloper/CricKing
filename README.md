# CricKing

CricKing is a live cricket score tracking application for 'Big Bash League' that fetches real-time data from the CricAPI. This project utilizes React for the frontend, Axios for data fetching, and Chart.js for data visualization.

## Technologies Used
- **API**: [CricAPI](https://cricapi.com/)
- **Frontend**: React.js
- **Data Fetching**: Axios with polling
- **Chart Visualization**: Chart.js

## Setup Instructions
1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/cricking.git
    cd cricking
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Run the application:
    ```sh
    npm start
    ```

4. Build the application:
    ```sh
    npm run build
    ```

## API and Mock Data
The application fetches live data from the CricAPI. If the API call fails or exceeds the limit, mock data is used as a fallback.

### API Setup
- Visit `services/api.js` and follow the instructions through comments to set up the API data view. If the API data view is not configured, mock data will be used by default.

## Features
- Live match scores and updates
- Odds and events visualization using Chart.js
- Dark mode toggle
- Filtering by team names

## Future Goals
- **Mobile App Conversion**
- **Notifications**: Implement real-time notifications for score updates or significant match events.
- **Historical Data and Statistics**: Integrate historical match data and player statistics for deeper insights.
- **User Authentication and Personalization**: Allow users to create accounts and personalize their experience.
- **Live Commentary**: Include live commentary for ongoing matches.
- **Social Sharing**: Add buttons for users to share match updates on social media platforms.
- **Feedback and Reviews**: Include a section where users can provide feedback and reviews.
- **Performance Optimization**: Optimize the performance of the application with lazy loading, caching, and minimizing API calls.

## Known Limitations
- The API doesn't provide required Odds and Events data. Default mock data's Odds and Events are used for Chart View and displayed for the first 5 matches of each category.

## Deployment
To deploy this project to Vercel:
1. Create a Vercel account if you don't have one.
2. Import the project repository to Vercel.
3. Follow the deployment steps provided by Vercel.

## Contributions
Feel free to fork this project and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.
