
import { useState } from "react";
import axios from "axios";
import QRCode from 'react-qr-code'

function ImageUpload() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [qrData, setQrData] = useState(null);


  const handleImageChange = (e) => {
    const files = e.target.files;
    setSelectedImages([...selectedImages, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedImages.length === 0) {
      console.log("No images selected.");
      return;
    }

    const formData = new FormData();
    selectedImages.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const userToken = sessionStorage.getItem('token');
      console.log(userToken)
      const response = await axios.post("http://localhost:3010/user/imageupload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            auth: `${userToken}`
          },
      });

      console.log("Images uploaded successfully:", response.data);
      console.log('response.data',response.data);
      const userId = response.data._id;
      console.log('userid',userId);
      const imageDetails = response.data.images;
      console.log('images',imageDetails);
      const qrData = JSON.stringify({userId,imageDetails})
      setQrData(qrData);

    } catch (error) {
      console.error("Error uploading images:", error);
    }

    setSelectedImages([]); 
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full px-4 py-8 bg-white rounded-md shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-4">Image Upload</h1>
        <form onSubmit={handleSubmit} className="space-y-4" encType={"multipart/form-data"}>
          <input
            name="images"
            type="file"
            accept="image/*"
            multiple 
            onChange={handleImageChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <button type="submit" className="w-full px-4 py-2 text-white bg-black rounded-md hover:bg-black-600 focus:outline-none focus:bg-black-600"> Upload Images </button>
        </form>
        {qrData && (
            <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">QR Code:</h2>
            <QRCode value={qrData} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageUpload;





