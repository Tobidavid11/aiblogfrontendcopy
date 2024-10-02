import RichTextEditor from "./components/RichTextEditor";

export default function Home() {
  return (
    <div>
      <div className=' flex justify-center items-center'>
        <div className='p-16 bg-gray-400'>Hello there, Welcome to AI Blog!</div>
      </div>
      Rich text Editor here!!
      <RichTextEditor />
    </div>
  );
}
