import { Editor } from "slate";
import PostEditor from "./editor";

const CreatePost = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <PostEditor />
    </div>
  );
};

export default CreatePost;
