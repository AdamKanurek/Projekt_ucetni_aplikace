import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SessionProvider } from './contexts/session.jsx'


createRoot(document.getElementById('root')).render(
	<StrictMode>
		<SessionProvider>
			<App />
		</SessionProvider>
	</StrictMode>,
)
