import React from "react";
import axios from "axios";
import url from "../../utils/url";
import useLocalState from "../../utils/localState";

const Blog = ({ author, message, _id }) => {
  const [isChange, setIsChange] = React.useState(false);
  const [changeObject, setChangeObject] = React.useState({
    author,
    message,
  });
  const rootRef = React.useRef();
  const authorRef = React.useRef();
  const messageRef = React.useRef();
  const idRef = React.useRef();

  const setAttributes = () => {
    authorRef.current?.setAttribute("contenteditable", "");
    messageRef.current?.setAttribute("contenteditable", "");

    messageRef.current?.classList.add("_edit");
    authorRef.current?.classList.add("_edit");

    messageRef.current?.focus();
  };

  const removeAttributes = () => {
    authorRef.current?.removeAttribute("contenteditable");
    messageRef.current?.removeAttribute("contenteditable");

    messageRef.current?.classList.remove("_edit");
    authorRef.current?.classList.remove("_edit");
  };

  const onClickChange = () => {
    setIsChange(true);
    setAttributes();
  };

  const onClickRemove = () => {
    const id = idRef.current?.textContent.trim();

    axios.delete(`${url}/api/v1/blog/${id}`).then((res) => {
      removeAttributes();
      setIsChange(false);
      console.log(res.data);
    });

    rootRef.current?.classList.add("remove");
    setIsChange(false);
    removeAttributes();

    setTimeout(() => {
      rootRef.current?.classList.add("_h");
    }, 800);
  };

  const onClickAbortChange = () => {
    setIsChange(false);
    removeAttributes();
  };

  const onClickApplyChanges = () => {
    const id = idRef.current?.textContent.trim();
    const blogAuthorContent = authorRef.current?.textContent.trim();
    const blogMessageContent = messageRef.current?.textContent.trim();

    axios
      .patch(`${url}/api/v1/blog/${id}`, {
        author: blogAuthorContent,
        message: blogMessageContent,
      })
      .then((res) => {
        removeAttributes();
        setIsChange(false);
        console.log(res.data);
      });
  };

  return (
    <div className="blog-card" ref={rootRef}>
      <div className="blog-card-id" ref={idRef}>
        {_id}
      </div>
      <div className="blog-card-body">
        <div className="blog-options">
          {isChange && (
            <svg
              className="blog-apply-changes"
              onClick={() => onClickApplyChanges()}
              width="800px"
              height="800px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.3938 2.20468C3.70395 1.96828 4.12324 1.93374 4.4679 2.1162L21.4679 11.1162C21.7953 11.2895 22 11.6296 22 12C22 12.3704 21.7953 12.7105 21.4679 12.8838L4.4679 21.8838C4.12324 22.0662 3.70395 22.0317 3.3938 21.7953C3.08365 21.5589 2.93922 21.1637 3.02382 20.7831L4.97561 12L3.02382 3.21692C2.93922 2.83623 3.08365 2.44109 3.3938 2.20468ZM6.80218 13L5.44596 19.103L16.9739 13H6.80218ZM16.9739 11H6.80218L5.44596 4.89699L16.9739 11Z"
                fill="#000000"
              />
            </svg>
          )}
          {isChange && (
            <svg
              className="remove-blog"
              onClick={() => onClickRemove()}
              width="800px"
              height="800px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 11V17"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 11V17"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 7H20"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          {isChange && (
            <svg
              className="blog-cancel-change"
              onClick={() => onClickAbortChange()}
              width="800px"
              height="800px"
              viewBox="0 0 512 512"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>cancel</title>
              <g
                id="Page-1"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <g
                  id="work-case"
                  fill="#000000"
                  transform="translate(91.520000, 91.520000)"
                >
                  <polygon
                    id="Close"
                    points="328.96 30.2933333 298.666667 1.42108547e-14 164.48 134.4 30.2933333 1.42108547e-14 1.42108547e-14 30.2933333 134.4 164.48 1.42108547e-14 298.666667 30.2933333 328.96 164.48 194.56 298.666667 328.96 328.96 298.666667 194.56 164.48"
                  ></polygon>
                </g>
              </g>
            </svg>
          )}
          <svg
            className="blog-change"
            onClick={() => onClickChange()}
            width="800px"
            height="800px"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
            <path
              fill="#000000"
              fillRule="evenodd"
              d="M15.198 3.52a1.612 1.612 0 012.223 2.336L6.346 16.421l-2.854.375 1.17-3.272L15.197 3.521zm3.725-1.322a3.612 3.612 0 00-5.102-.128L3.11 12.238a1 1 0 00-.253.388l-1.8 5.037a1 1 0 001.072 1.328l4.8-.63a1 1 0 00.56-.267L18.8 7.304a3.612 3.612 0 00.122-5.106zM12 17a1 1 0 100 2h6a1 1 0 100-2h-6z"
            />
          </svg>
        </div>

        <div className="blog-author" ref={authorRef}>
          {author}
        </div>
      </div>
      <div className="blog-message" ref={messageRef}>
        {message}
      </div>
    </div>
  );
};

export default Blog;
