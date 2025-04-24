import { CodeXml, Code } from 'lucide-react'

import { signal } from '@preact/signals-react'
import { Button } from '@/components/ui/button'

export const showDevTools = signal(false)

export function DevToolToggle() {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => {
        showDevTools.value = !showDevTools.value
      }}
    >
      {showDevTools.value ? <Code /> : <CodeXml />}
    </Button>
  )
}
