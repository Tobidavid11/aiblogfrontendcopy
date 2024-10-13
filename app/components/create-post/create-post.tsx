import PostEditor from "./editor";
import { PostConfig } from "./post-config";

const CreatePost = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr] mt-8 gap-5">
      <PostEditor />
      <PostConfig />
    </div>
  );
};

export default CreatePost;
