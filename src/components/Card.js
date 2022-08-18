import { useContext, useState } from "react";
import axios from "axios";
import { PostContext } from "./ConProvider";
import "./Styles.css";

import avatar from "./avatar.png";

export const Card = () => {
  const [postText, setPostText] = useState("");
  const [selectedGif, setSelectedGif] = useState("");
  const [results, setResults] = useState([]);

  const { post, setPost } = useContext(PostContext);

  const gifFetch = async (e) => {
    try {
      const res = await axios.get("https://api.giphy.com/v1/gifs/search", {
        params: {
          api_key: "6LFIY29mfqbxmNPyjLa4P2KD9zY5IZjm",
          q: e.target.value,
          limit: 25,
        },
      });
      setResults(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <img className="avatar" src={avatar} alt="" />
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          placeholder="Write your post.........."
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        >
          &nbsp; &nbsp;
        </textarea>
      </div>

      <div className="preview">
        {selectedGif ? (
          <img src={selectedGif} className="search-gif" alt="search-gif" />
        ) : (
          <></>
        )}
        &nbsp;
        <button
          className="gif-search"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          GIF
        </button>
        <ul className="dropdown-menu" id="dropdown-menu">
          <li>
            <input
              className="gifInput"
              type="text"
              placeholder="Search Gif"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) => {
                gifFetch(e);
              }}
            />
          </li>

          {results?.map((gif) => {
            return (
              <div key={gif.id}>
                {!!gif.images.fixed_height.url ? (
                  <img
                    onClick={() => {
                      setSelectedGif(gif.images.fixed_height.url);
                    }}
                    src={gif.images.fixed_height.url}
                    className="search-gif_d"
                    alt="search-gif"
                  />
                ) : (
                  <></>
                )}
              </div>
            );
          })}
        </ul>
      </div>
      <div className="container2">
        <button
          className="post-btn"
          onClick={() => {
            setPost([
              ...post,
              {
                postText,
                selectedGif,
              },
            ]);
            setPostText("");
            setSelectedGif("");
          }}
          disabled={!(postText || selectedGif)}
        >
          Post
        </button>
      </div>
    </div>
  );
};
