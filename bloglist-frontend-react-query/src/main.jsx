import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AppContextProvider from './contexts/AppContext'
import { BrowserRouter as Router } from 'react-router-dom'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
	<QueryClientProvider client={queryClient}>
		<AppContextProvider>
			<Router>
				<App />
			</Router>
		</AppContextProvider>
	</QueryClientProvider>
)
