'use client';

import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { Toaster } from 'react-hot-toast'; 

import { SearchBox } from '@/components/SearchBox/SearchBox';
import { Loader } from '@/components/Loader/Loader'; 
import { ErrorMessage } from '@/components/ErrorMessage/ErrorMessage'; 
import { ErrorMessageEmpty } from '@/components/ErrorMessageEmpty/ErrorMessageEmpty'; 
import { NoteList } from '@/components/NoteList/NoteList';
import { Modal } from '@/components/Modal/Modal';
import { NoteForm } from '@/components/NoteForm/NoteForm';
import Pagination from '@/components/Pagination/Pagination';

import { fetchNotes } from '@/lib/api';
import css from './NotesPage.module.css'; 

export default function NotesClient() {
  const [currentPage, setCurrentPage] = useState(1); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); 
  
  const { data, isError, isLoading, isSuccess } = useQuery({
    
    queryKey: ['notes', searchQuery, currentPage], 
    queryFn: () => fetchNotes(searchQuery, currentPage), 
    placeholderData: keepPreviousData,
    refetchOnMount: false, 
  });

  const toggleModal = () => setIsModalOpen((prev) => !prev);
  const totalPages = data?.totalPages ?? 0;
  const notes = data?.notes ?? []; 

  const changeSearchQuery = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
   
    setCurrentPage(1);
    setSearchQuery(e.target.value);
  }, 1000); 

  const handleCreateNote = toggleModal;
  const handleCloseModal = toggleModal;

  return (
    <div className={css.app}>
      <main>
        <section>
          <header className={css.toolbar}>
            {}
            <SearchBox onChange={changeSearchQuery} /> 
            {}
            {isSuccess && totalPages > 1 && (
              <Pagination
                
                page={currentPage} 
                total={totalPages} 
                onChange={setCurrentPage} 
              />
            )}
            <button onClick={handleCreateNote} className={css.button}>
              Create note +
            </button>
          </header>

          <Toaster position="top-right" /> {}
          {isLoading && <Loader />} {}
          {isError && <ErrorMessage />} {}
          {}
          {isSuccess && notes.length === 0 && <ErrorMessageEmpty />}
          
          {notes.length > 0 && <NoteList notes={notes} />}
          
          {isModalOpen && (
            <Modal onClose={handleCloseModal}>
              <NoteForm onClose={handleCloseModal} />
            </Modal>
          )}
        </section>
      </main>
    </div>
  );
}