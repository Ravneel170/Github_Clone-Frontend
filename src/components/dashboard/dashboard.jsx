import { useState, useEffect } from "react";

import './dashboard.css';

import axios from "axios";
  
import Navbar from "../navbar";

const API_URL = 'https://abcd1234.ngrok.io';

const Dashboard = () => {

  const [repositories, setRepositories] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');

  const [suggestedRepositories, setSuggestedRepositories] = useState([]);

  const [searchResults, setSearchResults] = useState([]);


  useEffect(() => {

    const userId = localStorage.getItem('userId');

    try {

      const fecthUserRepos = async () => {

        const res = await axios.get(`${API_URL}/repo/user/${userId}`);

        setRepositories(res.data.repos);
      }

      const fetchSuggestedRepos = async () => {

        const res = await axios.get(`${API_URL}/repo/all`);

        setSuggestedRepositories(res.data);
      }

      fecthUserRepos();

      fetchSuggestedRepos();

    } catch (error) {

      console.error('Error in fetching repos:', error.message);
    }

  }, []);

  useEffect(() => {

    if (searchQuery == '') {

      setSearchResults(repositories)

    } else {

      const filteredRepo = repositories.filter((repo) => repo.name.toLowerCase().includes(searchQuery.toLowerCase()));

      setSearchResults(filteredRepo);
    }

  }, [searchQuery, repositories])

  return (

    <>

      <Navbar></Navbar>

      <section id="dashboard">

        <aside>
          <h3 style={{ textDecoration: 'underline' }}>Suggested Repositories</h3>

          {suggestedRepositories.map((repo) => {

            return (

              <div key={repo._id}>

                <h4> Name: {repo.name}</h4>
                <h3>Description: {repo.description}</h3>
              </div>
            )
          })}
        </aside>

        <main>
          <h3 style={{ textDecoration: 'underline' }}>Your Repositories</h3>

          <div id="search">

            <input type="text"

              value={searchQuery}
              placeholder="Search Repository"

              onChange={(e) => setSearchQuery(e.target.value)}
            />

          </div>

          {searchResults.map((repo) => {

            return (

              <div key={repo._id}>
                <h4> Name: {repo.name}</h4>
                <h3>Description: {repo.description}</h3>

              </div>
            )
          })}

        </main>

        <aside>
          <h3>Upcoming Events</h3>

          <ul>

            <li>Tech Conference</li>
            <li>Developer Meetup</li>
            <li>React Summit</li>
          </ul>
        </aside>

      </section>

    </>
  )

}

export default Dashboard;