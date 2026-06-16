import React from 'react'
import { useState } from 'react';
import { server } from './main';

const App = () => {
  const [topic, setTopic] = useState("");
  const [slides, setSlides] = useState(5);
  const [downloading, setDownloading] = useState(false)

  const downloadPPT = async () => {
    try {
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

      <input
        type="number"
        placeholder="Slides"
        value={slides}
        onChange={(e) => setSlides(Number(e.target.value))}
        className='p-4 w-full outline-none border-2 border-white rounded-md'
      />

      <button  onClick={downloadPPT} className='p-4 w-full bg-amber-500  rounded-lg'>
       {downloading ? "Downloading..." : "Download PPT"} 
      </button>
      </div>
      
    </div>
  );
}

export default App