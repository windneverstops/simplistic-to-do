import './globals.css'
import { inter } from './styles/fonts'

export const metadata = {
  title: 'Minimal',
  description: 'Minimalist kanban board by @windneverstop on github',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen w-screen flex flex-col`}>
        <nav className='flex flex-col'>
          
        </nav>
        {children}
      </body>
    </html>
  )
}
