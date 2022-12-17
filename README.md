# ra-data-samagra

A Data Provider for react admin tailored to target the Samagra APIs consisting of GraphQL and Fusion Auth
endpoints.

### How to use
Firstly validate the Hasura URL and Public APIs
In your app, pass the session details as per sample env provided.

- Create an .env file and pass two variables
```
NEXT_PUBLIC_API_URL=something
NEXT_PUBLIC_HASURA_URL=something
```

Now store your hasura Session in a vairable in below format. 
```javascript
const session: any = {
  user: {
    name: null,
    email: null,
    image: null,
  },
  expires: "2022-09-23T04:48:50.273Z",
  jwt: localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData") || "").user.token
    : "",
  role: "Admin",
  fullName: "Samarth-Admin",
  username: "samarth-admin",
  applicationId: "f0ddb3f6-091b-45e4-8c0f-889f89d4f5da",
};
```

Here is the example implementation for the same
```javascript

import { hasuraDP, samagraAdminDataProvider, hasuraURL, baseURL } from "ra-data-samagra"

// Initialize the URLs from your app.
baseURL(process.env.NEXT_PUBLIC_API_URL);
hasuraURL(process.env.NEXT_PUBLIC_HASURA_URL);

// Create a session for your use case.
const session: any = {
  user: {
    name: null,
    email: null,
    image: null,
  },
  expires: "2022-09-23T04:48:50.273Z",
  jwt: localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData") || "").user.token
    : "",
  role: "Admin",
  fullName: "Samarth-Admin",
  username: "samarth-admin",
  applicationId: "f0ddb3f6-091b-45e4-8c0f-889f89d4f5da",
};

// Initiate the ra-data-hasura from ra-data-samagra based on your Session
hasuraDP(session);

// App component
const App = () => {
    const [dataProvider, setDataProvider] = useState(null as any);
    setDataProvider(samagraAdminDataProvider);
    // Now you can interact with your dataProvider state variable as per your use case.
    console.log(dataProvider);
}

```    
