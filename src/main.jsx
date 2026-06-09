import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './context/UserContext.jsx'
import { Provider } from "react-redux";
import { store } from "./redux/store";

createRoot(document.getElementById('root')).render(
   <StrictMode>
    <UserProvider>
 <Provider store={store}>
    <App />
  </Provider>
    </UserProvider>
  </StrictMode>,
)
