import { ClerkProvider, SignInButton, SignedOut } from '@clerk/nextjs'
import './globals.css'
import { inter } from './styles/fonts'

export const metadata = {
  title: 'Minimal',
  description: 'Minimalist kanban board by @windneverstop on github',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} h-screen w-screen flex flex-col`}>
          <nav className='flex flex-col'>
            <SignedOut>
              <SignInButton/>
            </SignedOut>
          </nav>
          {children}
        </body>
      </html>
    </ClerkProvider>

  )
}
