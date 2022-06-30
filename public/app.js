import { loadStoredViewConfig } from './view-config.js'
import { addSidebar } from './sidebar.js'
import { showViewPanels } from './view-panels.js'

main()

async function main() {
  const viewConfig = loadStoredViewConfig()

  if (viewConfig) {
    addSidebar()
    showViewPanels(viewConfig)
  } else {
    addSidebar({ open: true })
  }
}
