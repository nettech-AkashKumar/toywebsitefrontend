import React, { useEffect, useState } from "react";
import "./Productpanel.css";
import Form from "../../Components/ProductForm/Form";
import axios from "axios";
import DataTable from 'react-data-table-component'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBinLine } from 'react-icons/ri'
import logo from '../../Assets/Image/logo.png'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import BASE_URL from "../../config/config";

axios.defaults.baseURL = `${BASE_URL}`;

const Productpanel = () => {
  const [showForm, setShowForm] = useState(false);
  const [editSection, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    level_range: "",
    old_price: "",
    new_price: "",
    category: "",
    stock: "",
    type: "",
    primarymaterial: "",
    safetycompliance: "",
    durability: "",
    description: "",
    dimension: "",
    weight: "",
    returnpolicy: "",
    removableparts: "",
    assemblyrequired: "",
    cleaning: "",
    electronics: "",
    batteryoperated: "",
    contentinside: "",
    numberofcomponents: "",
    netqty: "",
    sku: "",
    color: "",
    target: "",
    keyfeatures: "",
    image: "",
  });
  //edit form data
  const [formDataEdit, setFormDataEdit] = useState({
    title: "",
    subtitle: "",
    level_range: "",
    old_price: "",
    new_price: "",
    category: "",
    stock: "",
    type: "",
    primarymaterial: "",
    safetycompliance: "",
    durability: "",
    description: "",
    dimension: "",
    weight: "",
    returnpolicy: "",
    removableparts: "",
    assemblyrequired: "",
    cleaning: "",
    electronics: "",
    batteryoperated: "",
    contentinside: "",
    numberofcomponents: "",
    netqty: "",
    sku: "",
    color: "",
    target: "",
    keyfeatures: "",
    image: "",
    _id: "",
  });
  const [dataList, setDataList] = useState([]);


  const handleOnChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((preve) => ({
        ...preve,
        [name]: [...files],
      }));
    } else {
      setFormData((preve) => ({
        ...preve,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData(); //create a new object and store
      Object.keys(formData).forEach((key) => {
        if (key === "image" && Array.isArray(formData[key])) {
          formData[key].forEach((file) => {
            formDataToSend.append("image", file);
          });
        } else {
          formDataToSend.append(key, formData[key])
        }
      });
      const data = await axios.post("/create", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("forrm data", data);
      if (data.data.success) {
        setShowForm(false);
        // alert(data.data.message);
        toast.success("Form Save Successfully!", {
          position: 'top-center',
          // autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          // theme: "colored",
        });
        getFetchData();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // alert("Failed to submit form");
      toast.error("Failed to submit form", {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        // theme: "colored",
      });
    }
  };

  //get data
  const getFetchData = async () => {
    const data = await axios.get("/");
    console.log("fetchdata", data);
    if (data.data.success) {
      setDataList(data.data.data);
      // alert(data.data.message)
    }
  };
  useEffect(() => {
    getFetchData();
  }, []);
  console.log("datalist", dataList);

  //handle delete
  const handleDelete = async (id) => {
    const data = await axios.delete("/delete/" + id);
    if (data.data.success) {
      getFetchData();
      alert(data.data.message);
    }
  };

  //handle update
  // const handleUpdate = async (e) => {
  //   e.preventDefault();
  //   const data = await axios.put("/update", formDataEdit);
  //   if (data.data.success) {
  //     getFetchData();
  //     alert(data.data.message);
  //     setIsEditing(false);
  //   }
  // };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formDataEdit).forEach((key) => {
        if (key === "image" && Array.isArray(formDataEdit[key])) {
          formDataEdit[key].forEach((file) => formDataToSend.append("image", file));
        } else {
          formDataToSend.append(key, formDataEdit[key]);
        }
      });
      const data = await axios.put("/update", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      if (data.data.success) {
        getFetchData();
        alert(data.data.message);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating data:', error)
    }
  };



  const handleEditOnChange = async (e) => {
    const { name, value, type, files } = e.target;
    setFormDataEdit((preve) => {
      return {
        ...preve,
        [name]: type === "file" ? [...(preve.image || []), ...files] : value,
      };
    });
  };

  // const handleEdit = async (detail) => {
  //   setFormDataEdit(detail);
  //   setIsEditing(true);
  //   console.log("detail", detail);
  // };

  const handleEdit = async (detail) => {
    console.log('deettaaill', detail)
    setFormDataEdit({
      ...detail,
      // image: detail.image ? detail.image.map(img => `${BASE_URL}/${img}`) : [],
      image: Array.isArray(detail.image) ? detail.image.map(img => img) : [`${BASE_URL}/${detail.image}`]
    });
    setIsEditing(true);
    console.log("detailsaq", detail);
  };


  const columns = [
    {
      name: 'Product Title',
      selector: (row) => row.title,
      sortable: true
    },
    {
      name: 'Product Category',
      selector: (row) => row.category,
      sortable: true
    },
    {
      name: 'Image',
      selector: (row) => (
        <img
          src={row.image?.[0]?.url ? `${BASE_URL}${row.image[0]?.url}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlCeVhPcF0B061dWx6Y2p6ZshztnAoVQI59g&s"}
          alt="Product"
          style={{
            height: "80px",
            width: "100px",
            objectFit: "cover",
            border: '1px solid #ddd',
            borderRadius: '4px',
            padding: '5px'
          }}
        />
      ),
      sortable: true
    },
    {
      name: 'Age Range',
      selector: (row) => `${row.level_range}yrs`,
      sortable: true
    },
    {
      name: 'Product Price',
      selector: (row) => `₹${row.new_price}`,
      sortable: true
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button className="" onClick={() => handleEdit(row)}><FiEdit /></button>
          <button className="" onClick={() => handleDelete(row._id)}><RiDeleteBinLine /></button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true
    },
  ];

  const [records, setRecords] = useState([]);
  useEffect(() => {
    setRecords(dataList);
  }, [dataList]);


  const handleFormFilterChange = (e) => {
    e.preventDefault();
    const newData = dataList.filter(row => {
      return row?.title?.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setRecords(newData);
  }


  return (
    <div className="dashboard">
      <main className="contentt">
        <header className="dashboardheader">
          <div>
          </div>
            <h1 className="logoproductlist" style={{ textAlign: 'center' }}>Products List</h1>
          <button className="add-product" onClick={() => setShowForm(true)}>
            + Add Product
          </button>
        </header>
        {console.log('reccords', records)}
        <DataTable
          columns={columns}
          data={records.length > 0 ? records : dataList}
          // selectableRows
          fixedHeader
          pagination
          highlightOnHover
          persistTableHead
          subHeader
          subHeaderComponent={
            <input type="text" placeholder="Search by title..." className="search-input" onChange={handleFormFilterChange} />
          }
        >
        </DataTable>
        {showForm && (
          <Form
            handleSubmit={handleSubmit}
            handleOnChange={handleOnChange}
            handleClose={() => setShowForm(false)}
            rest={formData}
            isEditing={false}
          />
        )}
        {editSection && (
          <Form
            handleSubmit={handleUpdate}
            handleOnChange={handleEditOnChange}
            handleClose={() => setIsEditing(false)}
            rest={formDataEdit}
            isEditing={true}
          />
        )}
        {console.log('formDataEdit', formDataEdit)}
      </main>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Productpanel;
