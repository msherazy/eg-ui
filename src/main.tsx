import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'sonner';

import UserProvider from '@/providers/user-provider.tsx';

import App from './App';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <App />
    </UserProvider>
    <Toaster position="top-center" richColors={true} />
  </QueryClientProvider>
);
