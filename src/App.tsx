import React, { Suspense } from 'react'

import { control } from '@/features/forms/user'

import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/theme-provider'
import { ModeToggle } from '@/components/mode-toggle'
import { showDevTools, DevToolToggle } from '@/components/dev-tool-toggle'
import type { UserFormInput } from '@/features/forms/user/schema'

import UserForm from '@/components/user-form'

const DevTool = React.lazy(() =>
  import('@hookform/devtools').then((mod) => ({
    default: mod.DevTool<UserFormInput>,
  })),
)

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen bg-background py-8 px-4 md:px-8">
        <div className="container mx-auto max-w-5xl">
          <div className="flex justify-between">
            <h1 className="mb-8 text-4xl font-bold tracking-tight">
              User Profile Form
            </h1>
            <div className="space-x-2">
              <ModeToggle />
              <DevToolToggle />
            </div>
          </div>
          <UserForm />
        </div>
      </div>
      <Toaster />
      {showDevTools.value && (
        <Suspense fallback={null}>
          <DevTool control={control} />
        </Suspense>
      )}
    </ThemeProvider>
  )
}

export default App
