import axios from "axios";

const URL = "https://spott.p.rapidapi.com/places/autocomplete";
export const getLocationData = async () => {
  try {
    const options = {
      params: {
        country: "US,CA",
        type: "CITY",
        q: "Sea",
        skip: "0",
        limit: "10",
      },
      headers: {
        "x-rapidapi-host": "spott.p.rapidapi.com",
        "x-rapidapi-key": "2af5e93202mshe529ac5954a54bap18cd39jsn0e1ca82e8e2d",
      },
    };

    const {
      data: { data },
    } = await axios.get(URL, options);
    return data;
  } catch (error) {
    console.log(error);
  }
};
