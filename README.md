# FURBook

## frontend

### dependencies

- axios
- react-router-dom (browserRouter)
- react-redux 
- redux (store, createStore)
- redux-promise-middleware

### components

- App.js
    - Welcome
    - Header
    - Home 
        - Profile (small display)
        - Friends (small display)
        - Browser (small display)
    - Profile
        - User (user info)
        - UserProfiles (userprofiles)
    - FriendBrowser
    - CreateProfile 
    *****(will have form, and preview of profile)
    - Friends
    - Profile
    - Register




### Routes

- Home => '/'
- Profile => '/profile'
- Create => '/create'
- Friends => '/friends'

### Redux

```js

const initialState = {
    profiles: [],
    friends: [],
    user: []
}

```

## backend

### dependencies

npm i massive express bcrypt axios redux redux-promise-middleware react-redux react-router-dom express-session dotenv concurrently

- express
- express-session
- massive
- dotenv
- bcrypt

## endpoint routes 


**auth**

- login: => '/auth/login'
- logout: => '/auth/logout'
- register: => '/auth/register'
- session: => '/auth/session'

**user**

- get: => '/api/user'
- getOne: => '/api/user/id'
- put: => '/api/user/:id'
- delete: => '/api/user/:id'

**profiles**

- get: => '/api/profiles'
- getOne: => '/api/profile/id'
- post: => '/api/profile'
- put: => '/api/profile/:id'
- delete: => '/api/profile/:id'

**friends**

- get: => '/api/friends'
- getOne: => '/api/friend/id'
- post: => '/api/friends' + body
- put: => '/api/friend/:id'
- delete: => '/api/friend/:id'




### database schema

- user
```sql

create table user(
    user_id serial primary key,
    username text not null,
    password text,
    email text,
    name text,
)


-- session is an obj, it contains user data when you log in but it can also contain which dog I will be selecting 



create table profiles(
    user_id integer references user(user_id)
    profile_id serial primary key,
    name text not null,
    breed text,
    gender text,
    image text,
    favorites text,
    country text,
    city text,
    state text,
    zipcode integer
)



```


- messages


```sql

create table messages(
    message_id serial primary key,
    message text not null,
    profile_id integer references profiles(profile_id)
)


JOIN - 

```

### server file structure 

- /server
    - index.js
    - controllers/
        - profilesController.js
        - friendsController.js
        - messagesController.js
        - userController.js

### dotenv - (add to gitignore)
```text

SESSION_SECRET = 
SERVER_PORT = 
CONNECTION_STRING = (append => ?ssl=true)

```

