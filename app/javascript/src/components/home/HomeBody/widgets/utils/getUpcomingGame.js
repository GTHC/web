import axios from 'axios';

const url = 'https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/teams/duke?fbclid=IwAR0SRAahBO2YvjrZ9dHQlHC1w5Fn6kgxxatRNHHayjS6vO3R7No2ZMTyMoA'; 

const getUpcomingGame = () => (
    axios.get(url)
);

export default getUpcomingGame
