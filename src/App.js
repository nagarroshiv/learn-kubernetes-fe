import { useEffect, useState } from "react";
import axios from "axios";
import { Input, Button, Header, Card } from "semantic-ui-react";

import "./App.scss";

function App() {
  const [posts, setPosts] = useState([]);

  const createPostHandler = async (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const description = event.target.description.value;

    const request = { title, description };
    console.log(request);
    await axios.post(`${[process.env.REACT_APP_API_URI]}/api/post`, request);
    window.location.reload();
  };

  const getPosts = async () => {
    let reqOptions = {
      url: `${[process.env.REACT_APP_API_URI]}/api/posts`,
      method: "GET"
    };

    let response = await axios.request(reqOptions);
    setPosts(response.data.data);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="App">
      <Header as="h2" className="app_header flex justify-center align-center">
        Learn K8 by deploying MERN app
      </Header>
      <div className="flex">
        <form onSubmit={createPostHandler} className="app_form">
          <Input placeholder="Title..." name="title" required fluid />
          <Input placeholder="Description" name="description" required fluid />
          <div className="flex align-center justify-center">
            <Button color="teal">Create Post</Button>
          </div>
        </form>
        <div className="app_posts">
          <Card.Group>
            {posts.map(({ _id, title, description }) => (
              <Card color="red" className="app_card" key={_id}>
                <h3>{title}</h3>
                <p>{description}</p>
              </Card>
            ))}
          </Card.Group>
        </div>
      </div>
    </div>
  );
}

export default App;
