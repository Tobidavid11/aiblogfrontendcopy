'use client'

import RichTextEditor from "./components/RichTextEditor/RichTextEditor";
import { Pen } from "lucide-react";
import Button from "@/app/components/CustomButton/Button";
import Job from "./components/JobCta";

export default function Home() {
  return (
    <div>
      <div className=' flex justify-center items-center'>
        <div className='p-16 bg-gray-400'>Hello there, Welcome to AI Blog!
        <Job/>
        </div>
      </div>
      Rich text Editor here!!
      <RichTextEditor />
      <div className=' flex justify-center items-center gap-4'>
      <Button size="small" color="primary" onClick={() => console.log('Clicked!')}>
        Follow
      </Button>
      <Button size="medium" color="secondary" variant="solid" >
        Apply
      </Button>
      
      
      <Button size="medium" color="secondary" variant="solid" icon={Pen} className="text-black">
        Write to earn
      </Button>
      
      <Button size="large" color="danger" disabled>
        Danger Zone
      </Button>
      
    </div>
    <Job/>
    </div>
  );
}
