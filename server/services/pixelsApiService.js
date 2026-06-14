export const pixelsApiService = async(imageQuery) =>{

  const response = await fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(
      imageQuery
    )}&per_page=1`,
    {
      headers: {
        Authorization: process.env.PEXELS_API_KEY,
      },
    }
  );
  if(!response.ok){
    throw error("something went wrong in pixels api" );
    
  }
  const data = await response.json();

  if (!data.photos || data.photos.length === 0) {
    return null;
  }

  return data.photos[0].src.large;
} 