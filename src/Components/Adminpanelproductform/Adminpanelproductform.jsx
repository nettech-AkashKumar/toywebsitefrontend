import React, { useState } from "react";
import "./Adminpanelproductform.css";

const Adminpanelproductform = ({
  formData,
  setFormData,
  handleAdd,
  handleUpdate,
  handleCloseForm,
  isEditing,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  function handleChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const imageDataUrl = reader.result;
        setFormData((prevData) => ({ ...prevData, image: imageDataUrl }));
        localStorage.setItem("product image", imageDataUrl);
      };
    }
    alert("Image uploaded successfully!");
  }

  return (
    <>
      <div></div>
      <div className="form_container">
        <form className="formm">
          <div className="justify-content-end d-flex w-100">
            <button
              type="button"
              className="btn btn-close"
              onClick={handleCloseForm}
            ></button>
          </div>

          <input type="hidden" name="id" value={formData.id || ""} />

          {/* Row 1 */}
          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="category"
              placeholder="Product category"
              value={formData.category}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="price"
              placeholder="Product price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Row 2 */}
          <div className="input-group">
            <input
              type="number"
              name="stock"
              placeholder="Product stock"
              value={formData.stock}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="status"
              placeholder="Product status"
              value={formData.status}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="type"
              placeholder="Type"
              value={formData.type}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Row 3 */}
          <div className="input-group">
            <input
              type="text"
              name="primaryMaterials"
              placeholder="Primary Materials"
              value={formData.primaryMaterials}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="safetyCompliance"
              placeholder="Safety Compliance"
              value={formData.safetyCompliance}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="durability"
              placeholder="Durability"
              value={formData.durability}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Row 4 */}
          <div className="input-group">
            <textarea
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
            ></textarea>
            <input
              type="text"
              name="dimension"
              placeholder="Dimension (e.g., 40×20×15 cm)"
              value={formData.dimension}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="weight"
              placeholder="Weight"
              value={formData.weight}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Row 5 */}
          <div className="input-group">
            <select
              style={{
                outline: "none",
                border: "1px solid #bfbfbf",
                borderRadius: "4px",
                color: "#898989",
              }}
              name="removableParts"
              value={formData.removableParts}
              onChange={handleInputChange}
              required
            >
              <option value="">Removable Parts</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>

            {/* <input
              type="text"
              name="assemblyRequired"
              placeholder="Assembly Required (Yes/No)"
              value={formData.assemblyRequired}
              onChange={handleInputChange}
              required
            /> */}

            <select
              style={{
                outline: "none",
                border: "1px solid #bfbfbf",
                borderRadius: "4px",
                color: "#898989",
              }}
              name="assemblyRequired"
              value={formData.assemblyRequired}
              onChange={handleInputChange}
              required
            >
              <option value="">Assembly Required</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>

            <input
              type="text"
              name="cleaning"
              placeholder="Cleaning Instructions"
              value={formData.cleaning}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Row 6 */}
          <div className="input-group">
            {/* <input
              type="text"
              name="electronics"
              placeholder="Electronics (Yes/No)"
              value={formData.electronics}
              onChange={handleInputChange}
              required
            /> */}

            <select
              style={{
                outline: "none",
                border: "1px solid #bfbfbf",
                borderRadius: "4px",
                color: "#898989",
              }}
              name="electronics"
              value={formData.electronics}
              onChange={handleInputChange}
              required
            >
              <option value="">Electronics</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>

            {/* <input
              type="text"
              name="batteryOperated"
              placeholder="Battery Operated (Yes/No)"
              value={formData.batteryOperated}
              onChange={handleInputChange}
              required
            /> */}

<select
              style={{
                outline: "none",
                border: "1px solid #bfbfbf",
                borderRadius: "4px",
                color: "#898989",
              }}
              name="batteryOperated"
              value={formData.batteryOperated}
              onChange={handleInputChange}
              required
            >
              <option value="">Battery Operated</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>

            <input
              type="text"
              name="contentInside"
              placeholder="Content Inside"
              value={formData.contentInside}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Row 7 */}
          <div className="input-group">
            <input
              type="number"
              name="numberOfComponents"
              placeholder="Number of Components"
              value={formData.numberOfComponents}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="netQty"
              placeholder="Net Qty"
              value={formData.netQty}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="sku"
              placeholder="SKU"
              value={formData.sku}
              onChange={handleInputChange}
              required
            />
          </div>
          {/* Row 8 */}
          <div className="input-group">
            <input
              type="text"
              name="color"
              placeholder="Color"
              value={formData.color}
              onChange={handleInputChange}
              required
            />
            <input
              type="file"
              id="imageFile"
              name="imageFile"
              accept="image/png, image/jpeg"
              onChange={handleChange}
              multiple
            />

            <input
              type="text"
              name="targetAge"
              placeholder="Target Age"
              value={formData.targetAge}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="keyFeatures"
              placeholder="Key Features"
              value={formData.keyFeatures}
              onChange={handleInputChange}
            ></textarea>
          </div>

          {isEditing ? (
            <button type="button" onClick={handleUpdate}>
              Update
            </button>
          ) : (
            <button type="button" onClick={handleAdd}>
              Create
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default Adminpanelproductform;
