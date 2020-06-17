import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('repositories').then(res => {
      setProjects(res.data);
    });
  }, []);

  function handleAddRepository() {
    const newProject = {
      url: "https://github.com/josepholiveira",
      title: `Desafio ReactJS ${Date.now()}`,
      techs: ["React", "Node.js"],
    }

    api
      .post('repositories', newProject)
      .then(res => setProjects([...projects, res.data]));
  }

  async function handleRemoveRepository(id) {
    api
      .delete(`repositories/${id}`)
      .then(() => setProjects(projects.filter(project => project.id != id)));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map(project => (
          <li key={project.id}>
            {project.title}
            <button onClick={() => handleRemoveRepository(project.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
