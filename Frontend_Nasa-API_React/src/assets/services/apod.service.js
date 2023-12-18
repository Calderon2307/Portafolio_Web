import axios from "axios";
const apiKey = "b74655YYlLNj6SW5XedAFKIPvqUt8ccYGVwJ6BTI";

const getApod = async (query) => {
    try {
        const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&${query}`);

        // Check if the HTTP response is successful
        if (response.status === 200) {
            // The response data is already in JSON format
            return Array.isArray(response.data) ? response.data : [response.data];
        } else {
            return [];
        }
    } catch (error) {
        console.error("An error occurred:", error);
        return [];
    }
};

export const getRandomApod = async () => {
    const queryParams = new URLSearchParams();
    queryParams.append("count", "1");

    return await getApod(queryParams.toString());
};

export const getApodsByRange = async (fromDate, toDate) => {
    const queryParams = new URLSearchParams();
    queryParams.append('start_date', fromDate);
    queryParams.append('end_date', toDate);

    return await getApod(queryParams.toString());
};

export const getApodByDate = async (date) => {
    const queryParams = new URLSearchParams();
    queryParams.append('date', date);

    return await getApod(queryParams.toString());
};