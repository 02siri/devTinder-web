# DevTinder UI

- Create Vite + React project 
- Install Taiwind postcss [CSS framework] [tailwind v3]
- Install DaisyUI [Design Component Library]
- Create Separate navbar component [/components/NavBar.jsx]
- Install react-router-dom
- Create <BrowserRouter>
    - Create <Routes> component
        - Create <Route = "/body"> 
            - Create Route Children > Create Outlet 
        - Created Footer
- Create login page
- Install Axios for making API call (can also use fetch)
- Install cors in backend => add middleware to app.js with configs (origin, credentials: true)
- Whenver making API call from frontend using Axios, pass {withCredentials:true} => to send token from backend to frontend, for authentication
- Install redux toolkit and react-redux packages : https://redux.js.org/tutorials/quick-start
    -> configureStore
        -> Provide store in App.js
    -> Create slice
    -> add reducer to Store

- Updating NavBar on Login (photo + Welcome msg)
- Refactor BASE_URL 

- In Body component, check if token is valid, when user logs in (by checking the profile/view API).
    - If not, redirect to the login page.
- API call to view profile should be made only once after logging in, because it should check from the redux store if user data is present 
