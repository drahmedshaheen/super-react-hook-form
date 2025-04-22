import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/theme-provider'
import { ModeToggle } from '@/components/mode-toggle'

import UserForm from '@/components/user-form'

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen bg-background py-8 px-4 md:px-8">
        <div className="container mx-auto max-w-5xl">
          <div className="flex justify-between">
            <h1 className="mb-8 text-4xl font-bold tracking-tight">
              User Profile Form
            </h1>
            <ModeToggle />
          </div>
          <UserForm />
        </div>
      </div>
      <Toaster />
    </ThemeProvider>
  )
}

export default App
