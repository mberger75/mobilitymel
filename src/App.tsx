import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { FilterChoices } from '@/types';

import { Filters } from '@/components/Filters/Filters';
import { Panel } from '@/components/Panel/Panel';
import { Map } from '@/components/Map/Map';

const queryClient = new QueryClient();

export default function App() {
  const [filters, setFilters] = useState<FilterChoices>({
    citiz: true,
    vlille: true,
    point: true,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <header className='app-header'>
        <h1>MobiliyMEL</h1>
        <Filters filters={filters} setFilters={setFilters} />
      </header>
      <main className='main'>
        <Panel filters={filters} />
        <Map filters={filters} />
      </main>
    </QueryClientProvider>
  );
}
