'use client';

import {   useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import CloseButton from '@/components/SVGs/CloseButton';

export function Modal({ children } ) {
  const router = useRouter();
  const dialogRef = useRef (null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <div className="modal-backdrop">
      <dialog ref={dialogRef} className="relative modal animate-open" onClose={onDismiss}>
      <div className='w-full flex justify-between bg-gray-100 p-2'>
          <div className='text-sm flex justify-center items-center'> Publishing</div>
          <CloseButton handleClick={onDismiss}  />  
        </div>
      {/* <button onClick={onDismiss}  */}
        {children}
      </dialog>
    </div>,
    document.getElementById('modal-root')
  );
}