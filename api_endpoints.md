### API URL [Omega Social API](https://api-omega.herokuapp.com/)

All routes are authenticated, token must be passed through header

### Example Request

<br>

```javascript
axios({
  method: "post",
  url: `${API_URL}/users/`,
  headers: {
    authorization: TOKEN, //ADD YOUR TOKEN HERE
  },
  data: { ...userDetails },
});
```

## **/api/users**

| Method | Endpont                               | Response | Description     |
| :----: | :------------------------------------ | -------- | --------------- |
|  POST  | `/api/users/add`                      | 201      | Add New User    |
|  GET   | `/api/users/find/:search_term`        | 201      | Add New User    |
|  GET   | `/api/users/get-all-friends/:user_id` | 200      | Get All Friends |
|  GET   | `/api/users/get-profile/:user_id`     | 200      | Get User By Id  |
|  PUT   | `/api/users/update-profile/:user_id`  | 201      | Update User     |
|  POST  | `/api/users/follow-user/:user_id`     | 201      | Follower User   |

### Request POST `/api/users`

<br>
Request Body Example

```json
{
  "name": "John Smith", //Required
  "user_name": "jsmith777", //Required
  "email": "jsmith@email.com", //Required
  "avatar_url": "https://avatar_url.com",
  "bio": "Lorem ipsum"
}
```

Response `201`

```json
{
  "user_id": "2a0cec7bd7a2c***********"
}
```
