import React from 'react';
import WelcomePage from './components/WelcomePage';
import ActionCard from './components/ActionCard';
import { СreateResourceType, GetResourceTypes, GetResourceType, UpdateResourceType, DeleteResourceType , DeleteMultipleResourceTypes} from './components/ResourceTypeAction';
import {CreateResource, DeleteMultipleResources, DeleteResource, GetAllResources, GetResource, UpdateResource } from './components/ResourceAction';


function App() {
 

  return (
    <div className="App">
      <WelcomePage />
      <ActionCard actionName="Create Resource Type" formComponent={<СreateResourceType/>} />
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