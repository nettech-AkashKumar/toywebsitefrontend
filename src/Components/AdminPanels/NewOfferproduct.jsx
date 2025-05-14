



// import { useState } from "react";

// const NewOfferproduct = () => {
//   const [offer, setOffer] = useState({
//     title: "",
//     description: "",
//     discount: "",
//   });
//   const [image, setImage] = useState(null);

//   const handleChange = (e) => {
//     setOffer({ ...offer, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!offer.title || !offer.description || !offer.discount || !image) {
//       alert("Please fill all fields and upload an image");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("title", offer.title);
//     formData.append("description", offer.description);
//     formData.append("discount", offer.discount);
//     formData.append("image", image);

//     try {
//       const res = await fetch("/api/offers", {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) {
//         const error = await res.json();
//         alert("Failed to add offer: " + error.message);
//         return;
//       }

//       const data = await res.json();
//       alert("Offer added!");
//     } catch (err) {
//       console.error("Error:", err);
//       alert("Something went wrong!");
//     }

//   };

//   return (
//     <form onSubmit={handleSubmit} encType="multipart/form-data">
//       <input name="title" onChange={handleChange} placeholder="Offer Title" />
//       <input name="description" onChange={handleChange} placeholder="Description" />
//       <input name="discount" onChange={handleChange} placeholder="Discount (%)" />
//       <input type="file" onChange={handleImageChange} accept="image/*" />
//       <button type="submit" style={{ backgroundColor: 'rgba(82, 9, 252, 0.945)', color: 'white' }}>
//         Add Offer
//       </button>
//     </form>
//   );
// };

// export default NewOfferproduct;   


import { useState, useRef } from "react";
import './NewOfferproduct.css'

const NewOfferproduct = () => {
  const [offer, setOffer] = useState({


  });
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setOffer({ ...offer, [e.target.name]: e.target.value });

  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!offer || !image) {
      alert("Please fill all fields and upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await fetch("http://localhost:8081/api/offers", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const error = await res.json();
        alert("Failed to add offer: " + error.message);
        return;
      }

      const data = await res.json();
      alert("Offer added!");
      console.log("kasim", data);

      setOffer({


      }); setImage(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // 👈 Clear file input manually
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong!");

    }

  };

  return (
    <form className="offerform" onSubmit={handleSubmit} encType="multipart/form-data"
      style={{ display: 'flex', flexDirection: 'column', gap: '15px', flexWrap: 'wrap', padding: '20px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0,0,0,0.1)', margin: '0 auto', alignItems: 'center' }}>
      <h3 style={{ marginBottom: '10px', color: 'black', fontSize: '20px', }}>Add New Product Offer</h3>
      <input type="file" onChange={handleImageChange} accept="image/*" ref={fileInputRef}
        style={{ flexGrow: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#fff', cursor: 'pointer', width: '100%' }}
      />
      <button type="submit" style={{ backgroundColor: '#5209FC', color: '#fff', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s', border: 'none' }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = '#3b08cc')}
        onMouseLeave={(e) => (e.target.style.backgroundColor = '#5209FC')}
      >
        Add Offer
      </button>
    </form>
  );
};

export default NewOfferproduct;

