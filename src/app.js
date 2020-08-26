const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.send(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repo = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repo);

  response.send(repo);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  const index = repositories.map((element) => element.id).indexOf(id);

  if (index === -1) {
    response.statusCode = 400;
    response.send();
    return;
  }

  repositories.splice(index[0], 1);

  const repo = {
    id,
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repo);

  response.send(repo);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const index = repositories.findIndex(repository => repository.id === id);

  if (index === -1) {
    response.statusCode = 400;
    response.send();
    return;
  }

  repositories.splice(index, 1);

  response.status(204).send();  
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const index = repositories.map((element) => element.id).indexOf(id);

  if (index === -1) {
    response.statusCode = 400;
    response.send();
    return;
  }

  const element = repositories.splice(index[0], 1)[0];

  const repo = {
    id: element.id,
    title: element.title,
    url: element.url,
    techs: element.techs,
    likes: element.likes + 1
  };

  repositories.push(repo);

  response.send(repo);
});

module.exports = app;
