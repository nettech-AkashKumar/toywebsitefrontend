import React, { useState, useEffect } from 'react';

function UpdateComponent({ id }) {
  const [item, setItem] = useState(null);
  const [updatedData, setUpdatedData] = useState({});

  useEffect(() => {
    const fetchItem = async () => {
      const response = await fetch(`api/items/${id}`);
      const data = await response.json();
      setItem(data);
      setUpdatedData(data);
    };

    fetchItem();
  }, [id]);

  const handleInputChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`api/items/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      // Handle successful update, e.g., show a success message or redirect
    } else {
      // Handle error
    }
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(item).map((key) => (
        <div key={key}>
          <label htmlFor={key}>{key}:</label>
          <input
            type="text"
            id={key}
            name={key}
            value={updatedData[key] || ''}
            onChange={handleInputChange}
          />
        </div>
      ))}
      <button type="submit">Update</button>
    </form>
  );
}

export default UpdateComponent;