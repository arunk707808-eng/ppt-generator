import axios from "axios"

export const pixelsApiService = async(imageQuery) =>{
  try {
    const response = await axios.get(
      "https://api.pexels.com/v1/search",
      {
        params: {
          query: imageQuery,
          per_page: 1,
        },
        headers: {
          Authorization: process.env.PEXELS_API_KEY,
        },
      }
    );

    const data = response.data;

    if (!data.photos?.length) {
      return null;
    }

    return data.photos[0].src.large;
  } catch (error) {
    console.error("pexel api Error:")
    console.error(error.response?.data || error.message);
    throw new Error("failed to fetch images for your topic")
  }
} 