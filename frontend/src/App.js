import React from 'react';
import WelcomePage from './components/WelcomePage';
import ResourceTypeForm from './components/ResourceTypesForm';
import ActionCard from './components/ActionCard';
import {  GetResourceTypes, GetResourceType, UpdateResourceType, DeleteResourceType } from './components/ResourceTypeAction';


function App() {
  const handleResourceTypeFormSubmit = (formData) => {
    fetch('http://localhost:8000/resource_types', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Resource type created:', data);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  };

  const resourceTypeForm = (
    <ResourceTypeForm onSubmit={handleResourceTypeFormSubmit} />
  );

  return (
    <div className="App">
      <WelcomePage />
      <ActionCard actionName="Create Resource Type" formComponent={resourceTypeForm} />
      <ActionCard actionName="Get All Resource Types" formComponent={<GetResourceTypes />} />
      <ActionCard actionName="Get Resource Type" formComponent={<GetResourceType />} />
      <ActionCard actionName="Update Resource Type" formComponent={<UpdateResourceType />} />
      <ActionCard actionName="Delete Resource Type" formComponent={<DeleteResourceType />} />
      {/* Добавьте другие ActionCards здесь */}
    </div>
  );
}

export default App;