import React, { useState, useEffect } from 'react';
import { createResourceType, getAllResourceTypes, getResourceType, updateResourceType,  deleteResourceType, deleteMultipleResourceTypes} from './api'; 

const СreateResourceType = () => {
  const [name, setName] = useState('');
  const [maxSpeed, setMaxSpeed] = useState('');
  const [error, setError] = useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSpeedChange = (event) => {
    setMaxSpeed(event.target.value);
  };


  const handleFormSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: name,
      max_speed: parseInt(maxSpeed),
    };
    createResourceType(data)
      .then((response) => {
        console.log('Resource created:', response);
      })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
        setError('Creation failed')
      });
  };


  return (
    <div>
      <h2>Create Resource</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <label>
          Max Speed:
          <input type="text" value={maxSpeed} onChange={handleSpeedChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

const GetResourceTypes = () => {
  const [resourceTypes, setResourceTypes] = useState([]);

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

  useEffect(() => {
    fetchResourceTypes();
  }, []);

  const handleRefresh = () => {
    fetchResourceTypes();
  };

  return (
    <div>
      <ul>
        {resourceTypes.map((type) => (
          <li key={type.id}>
            {type.id} - {type.name} - Max Speed: {type.max_speed}
          </li>
        ))}
      </ul>
      <button onClick={handleRefresh}>Refresh Data</button>
    </div>
  );
};

const GetResourceType = () => {
  const [resourceId, setResourceId] = useState(1); 
  const [resourceData, setResourceData] = useState(null);
  const [error, setError] = useState(null); 

  const handleIdChange = (event) => {
    setResourceId(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleGetResourceType(event, resourceId, setResourceData, setError);
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
  const [resourceId, setResourceId] = useState(1);
  const [name, setName] = useState('');
  const [maxSpeed, setMaxSpeed] = useState('');
  const [resourceData, setResourceData] = useState(null);
  const [error, setError] = useState(null);

  const handleIdChange = (event) => {
    setResourceId(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: name,
      max_speed: maxSpeed,
    };
    updateResourceType(resourceId, data)
      .then((response) => {
        console.log('Resource type updated:', response);
      })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  };

  const handleGetOldType = (event) => {
    handleGetResourceType(event, resourceId, setResourceData, setError);
  };

  useEffect(() => {
    if (resourceData) {
      setName(resourceData.name);
      setMaxSpeed(resourceData.max_speed);
    }
  }, [resourceData]);

  return (
    <div>
      <h2>Update Resource Type</h2>
      <div>
        <label>
          Resource ID:
          <input type="text" value={resourceId} onChange={handleIdChange} />
          <button onClick={handleGetOldType}>Get Resource Type</button>
        </label>
      </div>
      {resourceData && (
        <form onSubmit={handleFormSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Max Speed:
            <input type="text" value={maxSpeed} onChange={(e) => setMaxSpeed(e.target.value)} />
          </label>
          <button type="submit">Submit</button>
        </form>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

const DeleteResourceType = () => {
  const [resourceId, setResourceId] = useState(1); 
  const [successMessage, setSuccessMessage] = useState(null); 

  const handleIdChange = (event) => {
    setResourceId(event.target.value);
    setSuccessMessage(null); 
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    deleteResourceType(resourceId)
      .then((data) => {
        console.log('Resource type deleted:', data);
        setSuccessMessage('Resource type successfully deleted'); 
      })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null); 
      }, 1800);

      return () => clearTimeout(timer); 
    }
  }, [successMessage]);

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
      {successMessage && <p>{successMessage}</p>} {/* Success message */}
    </div>
  );
};

const handleGetResourceType = (event, resourceId, setResourceData, setError) => {
  event.preventDefault();
  getResourceType(resourceId)
    .then((data) => {
      console.log(data);
      const formedData = JSON.parse(data);
      if (Array.isArray(formedData) && formedData.length > 0) {
        setResourceData(formedData[0]);
        setError(null);
      } else {
        setResourceData(null); 
        setError('Resource not found');
      }
    })
    .catch((error) => {
      console.error('There has been a problem with your fetch operation:', error);
      setResourceData(null);
      setError('An error occurred');
    });
};

const DeleteMultipleResourceTypes = () => {
  const [resourceIds, setResourceIds] = useState(''); 
  const [successMessage, setSuccessMessage] = useState(null); 

  const handleIdChange = (event) => {
    setResourceIds(event.target.value);
    setSuccessMessage(null); 
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const ids = resourceIds.split(',').map(id => parseInt(id.trim())); 
    deleteMultipleResourceTypes(ids)
      .then((data) => {
        console.log('Resource types deleted:', data);
        setSuccessMessage('Resource types successfully deleted'); 
      })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null); 
      }, 1800);

      return () => clearTimeout(timer); 
    }
  }, [successMessage]);

  return (
    <div>
      <h2>Delete Multiple Resource Types</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Resource IDs (comma-separated):
          <input type="text" value={resourceIds} onChange={handleIdChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {successMessage && <p>{successMessage}</p>} {/* Сообщение об успехе */}
    </div>
  );
};

export {СreateResourceType, GetResourceTypes, GetResourceType, UpdateResourceType, DeleteResourceType, DeleteMultipleResourceTypes};
