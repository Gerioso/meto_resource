import React, { useState, useEffect } from 'react';
import {
  createResource,
  getAllResourceTypes,
  getAllResources,
  getResource,
  updateResource,
  deleteResource,
  deleteMultipleResources,
} from './api';

const CreateResource = () => {
  const [name, setName] = useState('');
  const [currentSpeed, setCurrentSpeed] = useState('');
  const [resourceType, setResourceType] = useState('');
  const [resourceTypes, setResourceTypes] = useState([]);
  const [error, setError] = useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSpeedChange = (event) => {
    setCurrentSpeed(event.target.value);
  };

  const handleResourceTypeChange = (event) => {
    setResourceType(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: name,
      current_speed: currentSpeed,
      resource_type_id: resourceType,
    };
    createResource(data)
      .then((response) => {
        console.log('Resource created:', response);
      })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
        setError('Creation failed')
      });
  };

  const fetchResourceTypes = async () => {
    try {
      const data = await getAllResourceTypes();
      setResourceTypes(JSON.parse(data));
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };

  useEffect(() => {
    fetchResourceTypes();
  }, []);

  return (
    <div>
      <h2>Create Resource</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <label>
          Current Speed:
          <input type="text" value={currentSpeed} onChange={handleSpeedChange} />
        </label>
        <label>
          Resource Type:
          <select value={resourceType} onChange={handleResourceTypeChange}>
            {resourceTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name} - Max Speed: {type.max_speed}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

const GetAllResources = () => {
  const [resourceDetails, setResourceDetails] = useState([]);

  const fetchAllResources = async () => {
    try {
      const data = await getAllResources();
      const formedData = JSON.parse(data)
      setResourceDetails(formedData);
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };

  useEffect(() => {
    fetchAllResources();
  }, []);

  const handleRefresh = () => {
    fetchAllResources();
  };

  return (
    <div>
      <ul>
        {resourceDetails.map((resourceDetail) => (
          <li key={resourceDetail.id}>
            {resourceDetail.id} - {resourceDetail.name} - Resource Type ID: {resourceDetail.resource_type_id} - Current Speed:{' '}
            {resourceDetail.current_speed}{' '}
            {resourceDetail.max_speed < resourceDetail.current_speed && (
              <span style={{ color: 'red' }}>
                - Speed Exceeded: {resourceDetail.speed_exceeded} ({resourceDetail.speed_exceeded_percentage}%)
              </span>
            )}
          </li>
        ))}
      </ul>
      <button onClick={handleRefresh}>Refresh Data</button>
    </div>
  );
};


const GetResource = () => {
  const [resourceId, setResourceId] = useState(1);
  const [resourceData, setResourceData] = useState(null);
  const [error, setError] = useState(null);

  const handleIdChange = (event) => {
    setResourceId(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetchResource(resourceId);
  };

  const fetchResource = async (resourceId) => {
    try {
      const data = await getResource(resourceId);
      const formedData = JSON.parse(data);
      setResourceData(formedData[0]);
      setError(null);
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
      setResourceData(null);
      setError('An error occurred');
    }
  };

  return (
    <div>
      <h2>Get Resource</h2>
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
          <p>Resource Type ID: {resourceData.resource_type_id}</p>
          <p>Current Speed: {resourceData.current_speed}</p>
          {resourceData.speed_exceeded  && (
            <p style={{ color: 'red' }}>
              Speed Exceeded: ({resourceData.speed_exceeded}%)
            </p>
          )}
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

const UpdateResource = () => {
  const [resourceId, setResourceId] = useState(1);
  const [name, setName] = useState('');
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [resourceData, setResourceData] = useState(null);
  const [resourceTypeId, setresourceTypeId] = useState(1)
  const [error, setError] = useState(null);

  const handleIdChange = (event) => {
    setResourceId(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: name,
      current_speed: currentSpeed,
      resource_type_id: resourceTypeId
    };
    updateResource(resourceId, data)
      .then((response) => {
        console.log('Resource updated:', response);
      })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  };

  const handleGetOldResource = (event) => {
    handleGetResource(event, resourceId, setResourceData, setError)
  };

  useEffect(() => {
    if (resourceData) {
      setName(resourceData.name);
      setCurrentSpeed(resourceData.current_speed);
      setresourceTypeId(resourceData.resource_type_id)
    }
  }, [resourceData]);

  return (
    <div>
      <h2>Update Resource</h2>
      <div>
        <label>
          Resource ID:
          <input type="text" value={resourceId} onChange={handleIdChange} />
          <button onClick={handleGetOldResource}>Get Resource</button>
        </label>
      </div>
      {resourceData && (
        <form onSubmit={handleFormSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Current Speed:
            <input type="text" value={currentSpeed} onChange={(e) => setCurrentSpeed(e.target.value)} />
          </label>
          <button type="submit">Submit</button>
        </form>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};
const DeleteResource = () => {
  const [resourceId, setResourceId] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleIdChange = (event) => {
    setResourceId(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    deleteResource(resourceId)
      .then((response) => {
        console.log('Resource deleted:', response);
        setSuccessMessage('Resource successfully deleted');
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
        setError('An error occurred');
      });
  };

  return (
    <div>
      <h2>Delete Resource</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Resource ID:
          <input type="text" value={resourceId} onChange={handleIdChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

const DeleteMultipleResources = () => {
  const [resourceIds, setResourceIds] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleIdsChange = (event) => {
    setResourceIds(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const ids = resourceIds.split(',').map(id => parseInt(id.trim())); 
    deleteMultipleResources(ids)
      .then((response) => {
        console.log('Resources deleted:', response);
        setSuccessMessage('Resources successfully deleted');
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      })
      .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
        setError('An error occurred');
      });
  };

  return (
    <div>
      <h2>Delete Multiple Resources</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Resource IDs (comma-separated):
          <input type="text" value={resourceIds} onChange={handleIdsChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};


const handleGetResource = (event, resourceId, setResourceData, setError) => {
  event.preventDefault();
  getResource(resourceId)
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

export { CreateResource, GetAllResources, GetResource, UpdateResource, DeleteResource, DeleteMultipleResources };
