import React from "react";
import "./ImageGallery.css"; // Import external CSS

const ImageGallery = ({ images = [], handleDeleteImg, id }) => {
console.log('iimmdf', id)

  return (
    <div className="gallery-container">
      {Array.isArray(images) && images.map((image, index) => (
        <div className="imagegallery">
          {console.log('imdfg', image)}
          <img key={image._id} src={`http://localhost:8081${image.url}`} alt={`Image ${index + 1}`} className="gallery-image" />
          {console.log('iidde', image._id)}
          <span onClick={() => handleDeleteImg(id, image._id)} className="btn btn-close crossbtn">X</span>
          {console.log('id and imageid', id, image._id)}
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;



// import React from "react";
// import "./ImageGallery.css"; // Import external CSS

// const ImageGallery = ({ previousImages = [], newImages = [], handleDeleteImg }) => {
//   return (
//     <div className="gallery-container">
//       {/* Previous Images (Fetched from Backend) */}
//       {previousImages.length > 0 && (
//         <div className="image-preview-container">
//           {previousImages.map((img, index) => {
//             const fullImageUrl = img.startsWith("http") ? img : `http://localhost:8081${img}`;
//             return (
//               <div key={index} className="imagegallery">
//                 <img
//                   src={fullImageUrl}
//                   alt={`previous-img-${index}`}
//                   className="gallery-image"
//                   style={{ height: "100px", width: "100px", marginRight: "10px" }}
//                 />
//                 <span onClick={() => handleDeleteImg(img)} className="btn btn-close crossbtn">X</span>
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* New Images (Uploaded by User) */}
//       {newImages.length > 0 && (
//         <div className="image-preview-container" style={{display: 'flex', gap: '19px'}}>
//           {newImages.map((img, index) => (
//             <div key={index} className="imagegallery">
//               <img
//                 src={URL.createObjectURL(img)}
//                 alt={`new-image-${index}`}
//                 className="gallery-image"
//                 style={{ height: "100px", width: "100px", marginRight: "10px" }}
//               />
//               <span onClick={() => handleDeleteImg(img)} className="btn btn-close crossbtn">X</span>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImageGallery;
