
import { HydrationBoundary, dehydrate, QueryClient } from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { fetchNotes, getNotesQueryKey } from '@/lib/api';
import { NotesResponse } from '@/types'; 

export default async function NotesPage() {
  const initialQuery = '';
  const initialPage = 1;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery<NotesResponse>({
    queryKey: getNotesQueryKey(initialQuery, initialPage),
    queryFn: () => fetchNotes(initialQuery, initialPage),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient
        initialQuery={initialQuery}
        initialPage={initialPage}
      />
    </HydrationBoundary>
  );
}