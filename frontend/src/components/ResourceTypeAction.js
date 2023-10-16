import React, { useState, useEffect } from 'react';
import { getAllResourceTypes, getResourceType, updateResourceType,  deleteResourceType} from './api'; // Импортируйте функцию из вашего файла api

const GetResourceTypes = () => {
  const [resourceTypes, setResourceTypes] = useState([]);

  useEffect(() => {
    const fetchResourceTypes = async () => {
      try {
        const data = await getAllResourceTypes();
        console.log('All resource types:', data);
        const formedData = JSON.parse(data)
        setResourceTypes(formedData);
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    };
    fetchResourceTypes();
  }, []);
  return (
    <div>
      <ul>
        {resourceTypes.map((type) => (
          <li key={type.id}>
            {type.id} - {type.name} - Max Speed: {type.max_speed}
          </li>
        ))}
      </ul>
    </div>
  );
};

const GetResourceType = () => {
  const [resourceId, setResourceId] = useState(1); // Значение по умолчанию
  const [resourceData, setResourceData] = useState(null); // Состояние для хранения данных типа ресурса
  const [error, setError] = useState(null); // Состояние для хранения ошибок

  const handleIdChange = (event) => {
    setResourceId(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    getResourceType(resourceId)
      .then((data) => {
        if (data && data.id) {
          setResourceData(data);
        } else {
          setResourceData(null); // Сброс данных, если тип не найден
          setError('Resource not found');
        }
      })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
        setResourceData(null); // Сброс данных в случае ошибки
        setError('An error occurred');
      });
  };

  return (
    <div>
      <h2>Get Resource Type</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Resource ID:
          <input type="text" value={resourceId} onChange={handleIdChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {resourceData && (
        <div>
          <p>Resource ID: {resourceData.id}</p>
          <p>Name: {resourceData.name}</p>
          <p>Max Speed: {resourceData.max_speed}</p>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

const UpdateResourceType = () => {
  const [resourceId, setResourceId] = useState(1); // Значение по умолчанию
  const [formData, setFormData] = useState({});

  const handleIdChange = (event) => {
    setResourceId(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    updateResourceType(resourceId, formData)
      .then((data) => {
        console.log('Resource type updated:', data);
      })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  };

  return (
    <div>
      <h2>Update Resource Type</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Resource ID:
          <input type="text" value={resourceId} onChange={handleIdChange} />
        </label>
        {/* Добавьте поля для обновления данных */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const DeleteResourceType = () => {
  const [resourceId, setResourceId] = useState(1); // Значение по умолчанию

  const handleIdChange = (event) => {
    setResourceId(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    deleteResourceType(resourceId)
      .then((data) => {
        console.log('Resource type deleted:', data);
      })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  };

  return (
    <div>
      <h2>Delete Resource Type</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Resource ID:
          <input type="text" value={resourceId} onChange={handleIdChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export { GetResourceTypes, GetResourceType, UpdateResourceType, DeleteResourceType };
