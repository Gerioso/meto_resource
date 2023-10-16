import React, { useState } from 'react';
import { createResourceType } from '../api'; // Замените на свой путь к api.js

const ResourceTypeForm = () => {
  const [name, setName] = useState('');
  const [maxSpeed, setMaxSpeed] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createResourceType({ name, max_speed: parseInt(maxSpeed) });
      console.log(response); // Используйте свою логику обработки ответа
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Max Speed:
          <input type="text" value={maxSpeed} onChange={(e) => setMaxSpeed(e.target.value)} />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ResourceTypeForm;
