import axios from "axios";

const URL =
  "https://travel-advisor.p.rapidapi.com/attractions/list-in-boundary";

export const getPlacesData = async (sw, ne) => {
  try {
    const {
      data: { data },
    } = await axios.get(URL, {
      params: {
        bl_latitude: sw.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
        tr_latitude: ne.lat,
      },
      headers: {
        "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
        "x-rapidapi-key": "13b5871819mshf310ed6c7533213p1e0488jsn3566e60de72d",
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
