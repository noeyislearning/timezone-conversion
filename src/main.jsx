import React from "react"
import ReactDOM from "react-dom/client"

/** Global Stylesheet (TailwindCSS) */
import "./assets/css/index.css"

/** Components */
import App from "./App.jsx"
import Footer from "./components/layouts/footer/Footer.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="font-dm-sans tracking-tighter">
      <App />
      <Footer />
    </div>
  </React.StrictMode>,
)
