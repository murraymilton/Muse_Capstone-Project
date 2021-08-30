import axios from "axios";

const URL = "https://eventbrite-com.p.rapidapi.com/event/117496833191";

const options = {
  headers: {
    "x-rapidapi-host": "eventbrite-com.p.rapidapi.com",
    "x-rapidapi-key": "2af5e93202mshe529ac5954a54bap18cd39jsn0e1ca82e8e2d",
  },
};

export const getEventsData = async () => {
  try {
    const {
      data: { data },
    } = await axios.get(URL, options);
    return data;
  } catch (error) {
    console.log(error);
  }
};
