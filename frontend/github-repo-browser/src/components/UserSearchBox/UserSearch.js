import React, { lazy, Suspense } from 'react'
import { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import { Button, Input } from "@mui/material";
import axios from "axios";
import "./UserSearch.css"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const UserSearch = () => {
  const [searchRequest,setSearchRequest] = useState()
  const [ownerName,setOwnerName] = useState()
  const [openUserSearch,setOpenUserSearch] = useState(false)
  const [openRepoSearch,setOpenRepoSearch] = useState(false)
  const [userSearchResponse,setUserSearchResponse] = useState("")
  const [repoSearchResponse,setRepoSearchResponse] = useState("")
  const [repos,setRepos] = useState([])
  const [commits,setCommits] = useState([])

  const userSubmitHandler = () =>{
    //https://api.github.com/users/${searchRequest}
    axios.get(`https://api.github.com/users/claytonFlannery`)
      .then(res =>{
      /* User details includes--> name, email, repos(list most recent,up to 3),profile pic, bio */
      setUserSearchResponse({
        name:res.data.name,
        bio:res.data.bio,
        avatar_url:res.data.avatar_url,
        reposUrl:res.data.repos_url
      })
      console.log(userSearchResponse)
      })
      .catch(err =>{
        console.log(err)
      })
     
    setOpenUserSearch(false)
  }
useEffect(() =>{
  //gets the list of the users repos
  axios.get(userSearchResponse.reposUrl)
  .then(res => {
    
    setRepos(res.data)
    console.log(repos[2].description)
  })
  .catch(err=>{ console.log(err) })
},[userSearchResponse])

//https://api.github.com/repos/${ownerName}/${searchRequest}
  const repoSubmitHandler = () =>{
    axios.get(`https://api.github.com/repos/facebook/react`)
    .then(res =>{
      console.log(res.data)
      /* RepoDetails--> owner name, name, last commit date,creation date, description,last 5 commits descriptions */
      setRepoSearchResponse({
        owner:res.data.owner.login,
        name:res.data.name,
        description:res.data.description,
        creationDate:res.data.created_at,
        lastCommitDate: res.data.updated_at
      })

    })
    .catch(err =>{
      console.log(err)
    })

    setOpenRepoSearch(false)
    
  }

  useEffect(() =>{
    let commitURI =`https://api.github.com/repos/${repoSearchResponse.owner}/${repoSearchResponse.name}/commits`

  //gets the list of the commits
  axios.get(commitURI)
      .then(res => {
        console.log(res.data)
        setCommits(res.data)
        console.log(commits[0].commit.author.name)
      })
      .catch(err =>{console.log(err)})},[repoSearchResponse])

  return (
    <div className="app_search">
        <Modal open={openUserSearch}  onClose={() =>setOpenUserSearch(false)}>
            <div style={style}>
              <form className="app_form">
                <center className="app_formCenter">
                    <Input 
                      placeholder="Username..."
                      type="text"
                      value={searchRequest}
                      onChange={(e)=>setSearchRequest(e.target.value)}
                    />
                    <Button onClick={userSubmitHandler}>Search User</Button>
                </center>
              </form>
            </div>
        </Modal>

        <Modal open={openRepoSearch} onClose={() =>setOpenRepoSearch(false)}>
            <div style={style}>
              <form className="app_form">
                <center className="app_formCenter">
                  {/* repo name and owner of repo name required for search to work, E.G.: facebook/react */}
                  <Input 
                      placeholder="Repository owner name..."
                      type="text"
                      value={ownerName}
                      onChange={(e)=>setOwnerName(e.target.value)}
                    />
                    <Input 
                      placeholder="Repository name..."
                      type="text"
                      value={searchRequest}
                      onChange={e=>setSearchRequest(e.target.value)}
                    />
                    <Button onClick={repoSubmitHandler}>Search Repo</Button>
                </center>
              </form>
            </div>
        </Modal>
        <div className="app-buttons">
          <Button onClick={() =>setOpenUserSearch(true)}>User Search</Button>
          <Button onClick={() =>setOpenRepoSearch(true)}>Repo Search</Button>
        </div>
        <div className="app-data">
          {userSearchResponse ? (<div>
            {/* response to user search */}
            <img src={userSearchResponse.avatar_url} alt="userAvatar"/>
            <div className="app-data">
              Name:{userSearchResponse.name}
            </div>
            <div className="app-data">Bio:{userSearchResponse.bio}</div>
            <div>Commits:
                  {repos.map(commit =>{
                   return ( <div className="app-data">

                      <div>description:{commit.description}</div>
                      <div>Date of last update: {commit.updated_at}</div>
                      
                    </div>
                  )})}
            </div>
          </div>)
          : (<div></div>)}
          {repoSearchResponse?(
            <div>
            <div className="app-data">Owner : {repoSearchResponse.owner}</div>
            <div className="app-data">Name : {repoSearchResponse.name}</div>
            <div className="app-data">Description : {repoSearchResponse.description}</div>
            <div className="app-data">Creation Date : {repoSearchResponse.creationDate}</div>
            <div className="app-data">Last Commit Date : {repoSearchResponse.lastCommitDate}</div>
            <div>Previous Commits:
              <div>
                {commits.map(commit =>{
                  return(
                    <div>
                      <div className="app-data">Commiter:{commit.commit.author.name}</div>
                      <div>Commit Date:{commit.commit.author.date}</div>
                      <div className="app-data">Description:{commit.commit.message}</div>
                    </div>
                    
                  )
                })}
              </div>
            </div>
        </div>
          ):(<div></div>)}
        </div>
    </div>
  )
}

export default UserSearch