const baseURL = 'http://localhost:8000'; // Поменяйте на свой URL, если требуется

async function createResourceType(data) {
  const response = await fetch(`${baseURL}/resource_types`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

async function getAllResourceTypes() {
  const response = await fetch(`${baseURL}/resource_types`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}

async function getResourceType(resourceTypeId) {
    const response = await fetch(`${baseURL}/resource_types/${resourceTypeId}`, {
      method: 'GET',
    });
    return response.json();
  }
  
  async function updateResourceType(resourceTypeId, data) {
    const response = await fetch(`${baseURL}/resource_types/${resourceTypeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
  
  async function deleteResourceType(resourceTypeId) {
    const response = await fetch(`${baseURL}/resource_types/${resourceTypeId}`, {
      method: 'DELETE',
    });
    return response.json();
  }

  async function deleteMultipleResourceTypes(ids) {
    return fetch(`${baseURL}/resource_types?ids=${ids.join(',')}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .catch((error) => console.error('There has been a problem with your fetch operation:', error));
  }

export { createResourceType, getAllResourceTypes, getResourceType, updateResourceType, deleteResourceType, deleteMultipleResourceTypes };
