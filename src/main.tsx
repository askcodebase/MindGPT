import { createRoot } from 'react-dom/client'
import MarkmapHooks from './MarkMap'
import './global.css'

function App() {
  return <MarkmapHooks />
}

const root = createRoot(document.getElementById('root')!)
root.render(<App />)
