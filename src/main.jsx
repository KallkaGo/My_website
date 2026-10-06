import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

console.info('%cNice to meet you', "color: orange;background: ivory;font-size:26px;border: 2px solid black;padding:10px;text-shadow: 1px 1px grey;border-radius:11px;")
