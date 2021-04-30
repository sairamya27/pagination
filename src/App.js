import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

//const USERS_URL = 'https://example.com/api/users';
//using random users api as the above
//specified api won't work out of codility platform

export default function App() {
  const [userInfos, setUserInfos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const res = await axios.get("https://randomuser.me/api/?results=46");
      setUserInfos(res.data.results);
      console.log(userInfos);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  function fetchFirst() {
    setCurrentPage(1);
  }
  function fetchPrevious() {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  }

  function fetchNext() {
    if (currentPage === Math.ceil(userInfos.length / usersPerPage)) return;
    setCurrentPage(currentPage + 1);
  }

  function fetchLast() {
    setCurrentPage(Math.ceil(userInfos.length / usersPerPage));
  }

  const indexOfLastPost = currentPage * usersPerPage;
  const indexOfFirstPost = indexOfLastPost - usersPerPage;
  const currentUsers = userInfos.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div>
      <p>
        using random users api as the above specified api won't work out of
        codility platform
      </p>
      <p>
        Displaying gender instead of id since id is not formatted in random user
        Api
      </p>
      <table className="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((userInfo, idx) => (
            <div key={idx} className="bodyStyle">
              <tr>
                <td>{userInfo.name.first}</td>{" "}
              </tr>
              <tr>
                <td>{userInfo.name.last}</td>
              </tr>
              <tr>
                <td>{userInfo.gender}</td>
              </tr>
            </div>
          ))}
        </tbody>
      </table>
      <section className="pagination">
        <button className="first-page-btn" onClick={fetchFirst}>
          first
        </button>
        <button className="previous-page-btn" onClick={fetchPrevious}>
          previous
        </button>
        <button className="next-page-btn" onClick={fetchNext}>
          next
        </button>
        <button className="last-page-btn" onClick={fetchLast}>
          last
        </button>
      </section>
    </div>
  );
}
