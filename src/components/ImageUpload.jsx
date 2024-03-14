
// import axios from "axios";
// import { useState } from "react";

// function ImageUpload() {
//   const [selectedImage, setSelectedImage] = useState(null);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setSelectedImage(file);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!selectedImage) {
//       console.log("No image selected.");
//       return;
//     }

   
//     console.log("Image selected:", selectedImage);
//     // Clear selected image
//     setSelectedImage(null);
//   };

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="max-w-md w-full px-4 py-8 bg-white rounded-md shadow-xl">
//         <h1 className="text-3xl font-bold text-center mb-4">Image Upload</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
//           />
//           <button
//             type="submit"
//             className="w-full px-4 py-2 text-white bg-black rounded-md hover:bg-black-600 focus:outline-none focus:bg-black-600"
//           >
//             Create QR
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ImageUpload;


import { useState } from "react";
import axios from "axios";

function ImageUpload() {
  const [selectedImages, setSelectedImages] = useState([]);

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
      const response = await axios.post("https://qr-code-generator-api-tau.vercel.app/user/imageupload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          auth: userToken 
        },
      });

      console.log("Images uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading images:", error);
    }

    setSelectedImages([]); 
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full px-4 py-8 bg-white rounded-md shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-4">Image Upload</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="images"
            type="file"
            accept="image/*"
            multiple 
            onChange={handleImageChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-black rounded-md hover:bg-black-600 focus:outline-none focus:bg-black-600"
          >
            Upload Images
          </button>
        </form>
      </div>
    </div>
  );
}

export default ImageUpload;





// import { useState } from "react";
// import QRCode from "qrcode.react"; // Import QRCode library

// function ImageUpload() {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [qrCodeData, setQRCodeData] = useState(null); // State to hold QR code data

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setSelectedImage(file);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!selectedImage) {
//       console.log("No image selected.");
//       return;
//     }
//     // Handle image upload here
//     console.log("Image selected:", selectedImage);
//     // Generate QR code data (for demonstration purposes, generating with image name)
//     const qrData = `Image Name: ${selectedImage.name}`;
//     setQRCodeData(qrData);
//     // Clear selected image
//     setSelectedImage(null);
//   };

//   return (
//     <div className="flex flex-col justify-center items-center h-screen">
//       <div className="max-w-md w-full px-4 py-8 bg-white rounded-md shadow-xl">
//         <h1 className="text-3xl font-bold text-center mb-4">Image Upload</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
//           />
//           <button
//             type="submit"
//             className="w-full px-4 py-2 text-white bg-black rounded-md hover:bg-black-600 focus:outline-none focus:bg-black-600"
//           >
//             Upload Image
//           </button>
//         </form>
//       </div>
//       {/* Display QR code if data is available */}
//       {qrCodeData && (
//         <div className="mt-8">
//           <h2 className="text-2xl font-bold mb-2">QR Code:</h2>
//           <div className="bg-white p-4 rounded-md shadow-md">
//             <QRCode value={qrCodeData} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ImageUpload;
