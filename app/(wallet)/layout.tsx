
import { Inter } from 'next/font/google'
import { NavBar } from '../(user)/sections'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'dRello',
  description: 'Decentralized task management and earning platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
       <section className=''>
        <NavBar/>
      <main className={inter.className}>{children}</main>
      </section>
  )
}