import React from 'react'
import { useState } from 'react';
import { server } from './main';

const App = () => {
  const [topic, setTopic] = useState("");
  const [slides, setSlides] = useState(5);
  const [downloading, setDownloading] = useState(false)
  const [error, setError] = useState("")

  const downloadPPT = async () => {
    try {
      let error = {}
      if(!topic){
        error.topic = "Topic is Required !"
        setError(error);
        return;
      }
      setError("")
      setDownloading(true)
      const response = await fetch(
      `${server}/api/ppt`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
          slides,
        }),
      }
    );
   if (!response.ok) {
  const errorData = await response.json();
  throw new Error(
    errorData.message || "something went wrong"
  );
}
    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = `${topic}.pptx`;

    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
    setDownloading(false)
    } catch (error) {
      setDownloading(false)
      alert(error.message)
    }
  };

  return (
    <div className='h-screen px-4 w-screen bg-black text-white flex justify-center ' >
      <div className='flex flex-col gap-4 max-w-md mt-4 px-4'>
<h1 className='font-bold text-4xl'>MAKE PPT SLIDES WITH AI </h1>
      <input
        type="text"
        placeholder="Enter Topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className='p-4 w-full outline-none border-2 border-white rounded-md'
      />

     <select
  value={slides}
  onChange={(e) => setSlides(Number(e.target.value))}
  className="p-4 w-full outline-none border-2 border-white rounded-md bg-black text-white"
>
  {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
    <option key={num} value={num}>
      {num} Slides
    </option>
  ))}
</select>
{error && <p className='text-red-500 text-sm p-2 border border-red-500 bg-black rounded-md w-full '>{error.topic}</p>}
      <button  onClick={downloadPPT} disabled={downloading} className='p-4 w-full bg-amber-500  rounded-lg cursor-pointer'>
       {downloading ? "Downloading..." : "Download PPT"} 
      </button>
      </div>
    </div>
  );
}

export default App