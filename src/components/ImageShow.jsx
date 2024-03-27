import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ImageShow = () => {
  const { userId } = useParams();
  const [imgdata, setimgData] = useState(null)
  console.log('imgdata', imgdata);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://qr-code-generator-api-tau.vercel.app/user/images/${userId}`,
        );
        const img = response.data;
        console.log('img', img);
        setimgData(img)
      } catch (error) {
        console.error("Error registering user:", error.response.data.error);
      }
    }
    fetchData()
  }, [userId])
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center" style={{ fontFamily: 'cursive' }}>Image Gallery</h1>
      <div className="flex  justify-center gap-4 flex-wrap">
        {imgdata && imgdata.user.images.map((url, index) => (
          <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg flex justify-between items-center">
            <img src={url} className="w-full h-80 object-cover" />
          </div>
        ))}
      </div>

    </div>
  )
}

export default ImageShow

