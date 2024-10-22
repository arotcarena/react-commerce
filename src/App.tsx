import './styles/App.css'
import Routes from './Components/Routes.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalStoreProvider } from './Stores/GlobalStore.tsx';


function App() {

  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <GlobalStoreProvider>
        <Routes />
      </GlobalStoreProvider>
    </QueryClientProvider>
  )
}

export default App
