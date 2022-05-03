import React from 'react'
import "./App.css"
import UserSearch from "./components/UserSearchBox/UserSearch"

const App = () => {
  return (
    <div className="app">
      <div className="app_header">
        <div className="app_headerLogo">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png" 
              alt="GitHub icon" 
              className="app_headerLogoIcon"
            />
            <h4 className="app_headerLogoText">GitHub</h4>
        </div>
      </div>
      
      {/* Banner of web app */}
      
      <UserSearch />
      {/* User search box--> requires axios fetch  */}

      {/* User details --> shown after fetch successful*/}

      {/* Repo details --> uses axios to get details(repo e.g. bootstrap)*/}

    </div>
  )
}

export default App