import Image from 'next/image'
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
        <h1>Home</h1>
         <a href="/mappage">map</a>
    </main>
  )
}
