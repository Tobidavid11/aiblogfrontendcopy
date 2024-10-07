'use client'
import SignIn from "./components/auth/SignInForm";
import SignUpForm from "./components/auth/signUpForm";
import RichTextEditor from "./components/RichTextEditor/RichTextEditor";
import { Pen } from "lucide-react";
import Button from "@/app/components/CustomButton/Button";

export default function Home() {
  return (
    <div>
      <div className=' flex justify-center items-center'>
        <div className='p-16 bg-gray-400'>Hello there, Welcome to AI Blog!</div>
      </div>
      Rich text Editor here!!
      <RichTextEditor />
      <SignIn/>
      <SignUpForm/>
      <div className=' flex justify-center items-center gap-4'>
      <Button size="small" color="primary" onClick={() => console.log('Clicked!')}>
        Follow
      </Button>
      <Button size="medium" color="secondary" variant="outline" >
        Apply
      </Button>
      
      
      <Button size="medium" color="primary" variant="outline" icon={Pen}>
        Write to earn
      </Button>
      
      <Button size="large" color="danger" disabled>
        Danger Zone
      </Button>
    </div>
    </div>
  );
}
