import styled from "styled-components";
import { useGlobalContext } from "../context";
import Blog from "../components/Blog";
import axios from "axios";
import url from "../utils/url";
import React from "react";
import useLocalState from "../utils/localState";
import Pagination from "../components/Pagination";

axios.defaults.withCredentials = true;

function Dashboard() {
  const { user } = useGlobalContext();
  const [blogs, setBlogs] = React.useState();
  const [currentPage, setCurrentPage] = React.useState(1);
  const { username, userId, userRole } = user;

  React.useEffect(() => {
    axios
      .get(
        `${url}/api/v1/blog/search?page=${currentPage}&limit=20&order=author`
      )
      .then((res) => {
        setBlogs(res.data.newBlogs);
      });
  }, [currentPage]);

  return (
    <>
      <Wrapper className="page">
        <h2>Hello there, {username}</h2>
        <p>
          Your ID : <span>{userId}</span>
        </p>
        <p>
          Your Role : <span>{userRole}</span>
        </p>
        <div className="blog-container">
          {blogs?.map((blog) => (
            <Blog key={blog._id} {...blog} />
          ))}
        </div>
        <Pagination onChangePage={(number) => setCurrentPage(number)} />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  p span {
    background: var(--primary-500);
    padding: 0.15rem 0.25rem;
    color: var(--white);
    border-radius: var(--borderRadius);
    letter-spacing: var(--letterSpacing);
  }
`;

export default Dashboard;
