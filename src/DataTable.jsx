import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import "./App.css";

const DataTable = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://assets.alippo.com/catalog/static/data.json"
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const result = await response.json();
        if (isMounted) {
          setData(result);
        }
      } catch (error) {
        console.error("Error fetching data", error);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleEdit = (index) => {
    setModalTitle("Edit your name");
    setModalContent(data[index].name);
    setCurrentIndex(index);
    setModalOpen(true);
  };

  const handleDelete = (index) => {
    setModalTitle("Confirm Delete");
    setModalContent("Are you sure you want to delete this item?");
    setCurrentIndex(index);
    setModalOpen(true);
  };

  const resetModalContent = () => {
    setModalContent(null);
  };

  const closeModal = () => {
    setModalOpen(false);
    resetModalContent();
  };

  const submitModal = (newValue) => {
    if (modalTitle === "Edit your name") {
      const newData = [...data];
      newData[currentIndex].name = newValue;
      setData(newData);
    } else {
      const newData = data.filter((_, i) => i !== currentIndex);
      setData(newData);
    }
    closeModal();
    resetModalContent();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (data.length === 0) {
    return <div>No data available.</div>;
  }

  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div className="app-container">
      <h1>Your Data Table</h1>
      <table>
        <thead>
          <tr>
            <th>SL. No</th>
            {headers.map((header, index) => (
              <th key={index}>
                {header.charAt(0).toUpperCase() + header.slice(1)}
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              {headers.map((header) => (
                <td key={header}>{item[header] || "-"}</td>
              ))}
              <td>
                <button className="edit-btn" onClick={() => handleEdit(index)}>
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        showModal={isModalOpen}
        title={modalTitle}
        content={modalContent}
        onSubmit={submitModal}
        onCancel={closeModal}
      />
    </div>
  );
};

export default DataTable;
