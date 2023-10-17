import React from 'react';
import WelcomePage from './components/WelcomePage';
import ResourceTypeForm from './components/ResourceTypesForm';
import ActionCard from './components/ActionCard';
import {  GetResourceTypes, GetResourceType, UpdateResourceType, DeleteResourceType , DeleteMultipleResourceTypes} from './components/ResourceTypeAction';
import {CreateResource, DeleteMultipleResources, DeleteResource, GetAllResources, GetResource, UpdateResource } from './components/ResourceAction';


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
      <ActionCard actionName="Delete Multiple Resource Types" formComponent={<DeleteMultipleResourceTypes />} />
      <ActionCard actionName="Create Resource" formComponent={<CreateResource/>} />
      <ActionCard actionName="Get All Resources" formComponent={<GetAllResources />} />
      <ActionCard actionName="Get Resource" formComponent={<GetResource />} />
      <ActionCard actionName="Update Resource" formComponent={<UpdateResource />} />
      <ActionCard actionName="Delete Resource" formComponent={<DeleteResource />} />
      <ActionCard actionName="Delete Multiple Resources" formComponent={<DeleteMultipleResources />} />
    </div>
  );
}

export default App;