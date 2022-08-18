import { useContext } from "react";
import { Card } from "./Card";
import Section from "./Section";
import { PostContext } from "./ConProvider";

export const Home = () => {
  const { post } = useContext(PostContext);
  return (
    <>
      <div className="container page">
        <Card />
        {post?.map((post) => {
          return (
            <div className="row mt-4" key={post.selectedGif}>
              <div className="col-sm-3"></div>
              <Section post={post} />

              <div className="col-sm-3"></div>
            </div>
          );
        })}
      </div>
    </>
  );
};
