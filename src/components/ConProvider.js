import { createContext, useState } from "react";

export const PostContext = createContext();

const ConProvider = ({ children }) => {
  const [post, setPost] = useState([]);
  return (
    <PostContext.Provider value={{ post, setPost }}>
      {children}
    </PostContext.Provider>
  );
};

export default ConProvider;
