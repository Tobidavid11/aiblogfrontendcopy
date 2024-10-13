import '../globals.css';
import Sidebar from '@/app/(user)/(jobs)/jobs/[id]/_components/sideBarForJobQuestion'
import { NavBar } from '@/app/(user)/sections'
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Task Questions App',
  description: 'Answer questions about data-driven growth',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
        <div className="max-w-7xl h-screen overflow-hidden   mx-auto ">
             <NavBar />
            <main className="relative overflow-hidden   h-screen mt-10  sm:px-6 lg:px-8">
                {children}
              
            </main>
        </div>
   
  )
}