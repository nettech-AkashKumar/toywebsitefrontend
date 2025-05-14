
import React, { useEffect, useState } from "react";
import "./Form.css";
import { MdClose } from "react-icons/md";
import ImageGallery from "../CrudImageGallery/ImageGallery";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";


const Form = ({
  handleSubmit,
  handleOnChange,
  handleClose,
  rest,
  isEditing,
}) => {
  const handleDeleteImage = async (productId, imageId) => {
    console.log("productId, imageId", productId, imageId);
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        await axios.delete(
          `http://localhost:8081/delete-image/${productId}/${imageId}`
        );
        alert("Image deleted success");
      } catch (error) {
        console.log("Error deleting image:", error);
      }
    }
  };

  const [dataList, setDataList] = useState([]);

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

  const [enableCategory, setEnableCategory] = useState(false);
  useEffect(() => {
    if (rest?.category === "toy" || rest?.category === "stationary") {
      setEnableCategory(true);
    } else {
      setEnableCategory(false);
    }
  }, [rest?.category]);
  console.log("enablecateerrgory", enableCategory);

  //for  dynamically fetching category in form from category in admin
  const [categories, setCategories]= useState([])
  const [targets, setTargets] = useState([])
  // useEffect(() => {
  //   const categories = JSON.parse(localStorage.getItem('categories')) || [];
  //   setLocalCategories(categories)
  // })

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8081/api/categories/all");
      setCategories(res.data.categories)
      console.log('resform12345', res.data.categories)
    }catch(error) {
      console.error('Failed to fetch categories', error)
    }
  };

  const fetchTargets = async () => {
    try {
      const restarget = await axios.get("http://localhost:8081/api/target/all");
      setTargets(restarget.data.targets)
      console.log('restarget', restarget.data.targets)
    }catch(error) {
      console.error('Failed to fetch targets', error)
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchTargets();
  }, []);
  
  return (
    <div className="container2">
      <h1> {isEditing ? "Edit Product Form" : "Add Product Form"}</h1>
      <div className="justify-content-end d-flex w-100">
        <button
          type="button"
          className="btn btn-formclose"
          onClick={handleClose}
        >
          <MdClose />
        </button>
      </div>
      <form
        className="form"
        action="/create"
        method="post"
        onSubmit={handleSubmit}
        enctype="multipart/form-data"
      >
        <div className="rowt">
          <div className="form-groupee w-full mb-3">
            <TextField
              type="text"
              id="title"
              label="Title "
              variant="outlined"
              fullWidth
              name="title"
              value={rest?.title}
              onChange={handleOnChange}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {borderColor: '#8565d1'}
                }
              }}
            />
          </div>
          <div className="form-groupee w-full mb-3">
            <TextField
              type="text"
              id="subtitle"
              label="SubTitle "
              variant="outlined"
              fullWidth
              name="subtitle"
              value={rest?.subtitle}
              onChange={handleOnChange}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': { borderColor: '#8565d1' },
                }
              }}
            />
          </div>
        </div>
        <div className="rowt">
          <div className="form-groupee w-full mb-3">
            <TextField
              type="number"
              id="old_price"
              label="Old Price "
              variant="outlined"
              fullWidth
              name="old_price"
              value={rest?.old_price}
              onChange={handleOnChange}
              required
              InputProps={{
                inputProps: { className: "no-spinner" },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': { borderColor: '#8565d1' },
                }
              }}
            />
          </div>
          <div className="form-groupee w-full mb-3">
            <TextField
              className="no-spinner"
              type="number"
              id="new_price"
              label="New Price "
              variant="outlined"
              fullWidth
              name="new_price"
              value={rest?.new_price}
              onChange={handleOnChange}
              required
              InputProps={{
                inputProps: { className: "no-spinner" },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': { borderColor: '#8565d1' },
                }
              }}
            />
          </div>
        </div>
        <div className="rowt">
          <div className="form-groupee w-full mb-3">
            <TextField
              type="text"
              id="level_range"
              label="Age Range "
              variant="outlined"
              fullWidth
              name="level_range"
              value={rest?.level_range}
              onChange={handleOnChange}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': { borderColor: '#8565d1' },
                }
              }}
            />
          </div>
          <div className="form-groupee w-full mb-3">
            <TextField
              select
              id="category"
              label="Category "
              name="category"
              variant="outlined"
              onChange={handleOnChange}
              required
              value={rest?.category}
              type="text"
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': { borderColor: '#8565d1' },
                }
              }}
            >
             {categories.length > 0 ? (
              categories.map((cat) => (
                <MenuItem key={cat._id} value={cat.name}>{cat.name}</MenuItem>
              ))  ): (
              <MenuItem disabled>No Categories Available</MenuItem> 
             )}
            </TextField>
          </div>
          {/* <div className="form-groupee w-full mb-3">
            <TextField
              select
              id="category"
              label="Category "
              name="category"
              variant="outlined"
              onChange={handleOnChange}
              required
              value={rest?.category}
              type="text"
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': { borderColor: '#8565d1' },
                }
              }}
            >
              <MenuItem value="toy">Toys</MenuItem>
              <MenuItem value="stationary">Stationary</MenuItem>
              <MenuItem value="Hairaccess">Hairaccess</MenuItem>
              <MenuItem value="Topwear">Topwear</MenuItem>
              <MenuItem value="SportsWear">SportsWear</MenuItem>
              <MenuItem value="Footwear">Footwear</MenuItem>
            </TextField>
          </div> */}
        </div>
        <div className="rowt">
          <div className="form-groupee w-full mb-3">
            <TextField
              className="no-spinner"
              type="number"
              id="stock"
              label="Stock "
              variant="outlined"
              fullWidth
              name="stock"
              value={rest?.stock}
              onChange={handleOnChange}
              required
              InputProps={{
                inputProps: { className: "no-spinner" },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': { borderColor: '#8565d1' },
                }
              }}
            />
          </div>
          <div className="form-groupee w-full mb-3">
            <TextField
              type="text"
              name="type"
              id="type"
              label="Type "
              variant="outlined"
              fullWidth
              value={rest?.type}
              onChange={handleOnChange}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': { borderColor: '#8565d1' },
                }
              }}
            />
          </div>
        </div>
        {/* primary material & compilance */}
        <div className="rowt">
          <div className="form-groupee w-full mb-3">
            <TextField
              type="text"
              name="primarymaterial"
              id="type"
              label="Primary Material "
              variant="outlined"
              fullWidth
              value={rest?.primarymaterial}
              onChange={handleOnChange}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': { borderColor: '#8565d1' },
                }
              }}
            />
          </div>
          <div className="form-groupee w-full mb-3">
            <TextField
              type="text"
              name="safetycompliance"
              id="safetycompliance"
              label="Safety Compilance "
              variant="outlined"
              fullWidth
              value={rest?.safetycompliance}
              onChange={handleOnChange}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': { borderColor: '#8565d1' },
                }
              }}
            />
          </div>
        </div>
        {/* durability & description */}
        <div className="rowt">
          <div className="form-groupee w-full mb-3">
            <TextField
              type="text"
              name="durability"
              id="durability"
              label="Durability "
              variant="outlined"
              fullWidth
              value={rest?.durability}
              onChange={handleOnChange}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': { borderColor: '#8565d1' },
                }
              }}
            />
          </div>
          <div className="form-groupee w-full mb-3">
            <TextField
              type="text"
              name="description"
              id="description"
              label="Description "
              variant="outlined"
              fullWidth
              value={rest?.description}
              onChange={handleOnChange}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': { borderColor: '#8565d1' },
                }
              }}
            />
          </div>
        </div>
        {/* dimension & weight */}
        <div className="rowt">
          <div className="form-groupee w-full mb-3">
            <TextField
              type="text"
              name="dimension"
              id="dimension"
              label="Dimension "
              variant="outlined"
              fullWidth
              value={rest?.dimension}
              onChange={handleOnChange}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': { borderColor: '#8565d1' },
                }
              }}
            />
          </div>
          <div className="form-groupee w-full mb-3">
            <TextField
              type="text"
              name="weight"
              id="weight"
              label="Weight "
              variant="outlined"
              fullWidth
              value={rest?.weight}
              onChange={handleOnChange}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': { borderColor: '#8565d1' },
                }
              }}
            />
          </div>
        </div>
        {/* return policy & cleaning */}
        <div className="rowt">
          <div className="form-groupee w-full mb-3">
            <TextField
              type="text"
              name="returnpolicy"
              id="returnpolicy"
              label="Returnpolicy "
              variant="outlined"
              fullWidth
              value={rest?.returnpolicy}
              onChange={handleOnChange}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': { borderColor: '#8565d1' },
                }
              }}
            />
          </div>
          <div className="form-groupee w-full mb-3">
            <TextField
              type="text"
              name="cleaning"
              id="cleaning"
              label="Cleaning "
              variant="outlined"
              fullWidth
              value={rest?.cleaning}
              onChange={handleOnChange}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': { borderColor: '#8565d1' },
                }
              }}
            />
          </div>

        </div>
        {/* assembly required & cleaning */}
        {enableCategory && (
          <>
            <div className="rowt">
              <div className="form-groupee w-full mb-3">
                <TextField
                  select
                  id="assemblyrequired"
                  type="text"
                  name="assemblyrequired"
                  label="Assembly Required"
                  onChange={handleOnChange}
                  required
                  value={rest?.assemblyrequired}
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': { borderColor: '#8565d1' },
                    }
                  }}
                >
                  <MenuItem value="yes">Yes</MenuItem>
                  <MenuItem value="no">No</MenuItem>
                </TextField>
              </div>
              <div className="form-groupee w-full mb-3">
                <TextField
                  select
                  id="removableparts"
                  type="text"
                  name="removableparts"
                  label="Removableparts"
                  onChange={handleOnChange}
                  value={rest?.removableparts}
                  required
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': { borderColor: '#8565d1' },
                    }
                  }}
                >
                  <MenuItem value="yes">Yes</MenuItem>
                  <MenuItem value="no">No</MenuItem>
                </TextField>
              </div>
            </div>
            {/* electrnics & batteryoperated */}
            <div className="rowt">
              <div className="form-groupee w-full mb-3">
                <TextField
                  select
                  id="electronics"
                  type="text"
                  name="electronics"
                  label="Electronics"
                  onChange={handleOnChange}
                  required
                  value={rest?.electronics}
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': { borderColor: '#8565d1' },
                    }
                  }}
                >
                  <MenuItem value="yes">Yes</MenuItem>
                  <MenuItem value="no">No</MenuItem>
                </TextField>
              </div>
              <div className="form-groupee w-full mb-3">
                <TextField
                  select
                  id="elecbatteryoperatedronics"
                  type="text"
                  name="batteryoperated"
                  label="Batteryoperated"
                  onChange={handleOnChange}
                  required
                  value={rest?.batteryoperated}
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': { borderColor: '#8565d1' },
                    }
                  }}
                >
                  <MenuItem value="yes">Yes</MenuItem>
                  <MenuItem value="no">No</MenuItem>
                </TextField>
              </div>
            </div>
          </>
        )}
        {/* contentinside & no of components */}
        <div className="rowt">
          <div className="form-groupee w-full mb-3">
            <TextField
              type="text"
              name="contentinside"
              id="contentinside"
              label="Contentinside "
              variant="outlined"
              fullWidth
              value={rest?.contentinside}
              onChange={handleOnChange}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': { borderColor: '#8565d1' },
                }
              }}
            />
          </div>
          <div className="form-groupee w-full mb-3">
            <TextField
              type="text"
              name="numberofcomponents"
              id="numberofcomponents"
              label="NumberofComponents "
              variant="outlined"
              fullWidth
              value={rest?.numberofcomponents}
              onChange={handleOnChange}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': { borderColor: '#8565d1' },
                }
              }}
            />
          </div>
        </div>
        {/* netqty & sku */}
        <div className="rowt">
          <div className="form-groupee w-full mb-3">
            <TextField
              type="text"
              name="netqty"
              id="netqty"
              label="NetQty "
              variant="outlined"
              fullWidth
              value={rest?.netqty}
              onChange={handleOnChange}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': { borderColor: '#8565d1' },
                }
              }}
            />
          </div>
          <div className="form-groupee w-full mb-3">
            <TextField
              type="text"
              name="sku"
              id="sku"
              label="SKU "
              variant="outlined"
              fullWidth
              value={rest?.sku}
              onChange={handleOnChange}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': { borderColor: '#8565d1' },
                }
              }}
            />
          </div>
        </div>
        {/* color & target */}
        <div className="rowt">
          <div className="form-groupee w-full mb-3">
            <TextField
              type="text"
              name="color"
              id="color"
              label="Color "
              variant="outlined"
              fullWidth
              value={rest?.color}
              onChange={handleOnChange}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': { borderColor: '#8565d1' },
                }
              }}
            />
          </div>
          {/* <div className="form-groupee w-full mb-3">
            <TextField
              select
              id="target"
              label="Target "
              name="target"
              variant="outlined"
              value={rest.target}
              onChange={handleOnChange}
              required
              type="text"
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': { borderColor: '#8565d1' },
                }
              }}
            >
              <MenuItem value="Kids">Kids</MenuItem>
              <MenuItem value="Boys">Boys</MenuItem>
              <MenuItem value="Girls">Girls</MenuItem>
            </TextField>
          </div> */}
           <div className="form-groupee w-full mb-3">
            <TextField
              select
              id="target"
              label="target "
              name="target"
              variant="outlined"
              required
              value={rest.target}
              onChange={handleOnChange}
              type="text"
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': { borderColor: '#8565d1' },
                }
              }}
            >
             {targets.length > 0 ? (
              targets.map((tar) => (
                <MenuItem key={tar._id} value={tar.target}>{tar.target}</MenuItem>
              ))  ): (
              <MenuItem disabled>No Target Available</MenuItem> 
             )}
            </TextField>
          </div>
        </div>
        {/* key feature */}
        <div className="form-groupee w-full mb-3">
          <TextField
            type="text"
            name="keyfeatures"
            id="keyfeatures"
            label="keyfeatures "
            variant="outlined"
            fullWidth
            value={rest?.keyfeatures}
            onChange={handleOnChange}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': { borderColor: '#8565d1' },
              }
            }}
          />
        </div>
        <div className="form-groupee w-full mb-3">
          {/* Display Images */}
          <ImageGallery
            images={rest?.image}
            id={rest?._id}
            handleDeleteImg={handleDeleteImage}
          />
          {/* File Input for New Images */}
          <input
            type="file"
            name="image"
            label="Image "
            multiple
            onChange={handleOnChange}
            style={{ display: 'none' }}
            id="file-input"
          />
          <label htmlFor="file-input" >
            <Button style={{ backgroundColor: '#793cfa' }} variant="contained" component="span">
              Upload Images
            </Button>
          </label>
        </div>
        <button className="productformbtn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
