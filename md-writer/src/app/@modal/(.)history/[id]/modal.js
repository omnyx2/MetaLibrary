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
  console.log("modal portal")

  return createPortal(
    <div className="modal-backdrop">
      <dialog ref={dialogRef} className="modal" onClose={onDismiss}>
      <div className='w-full flex justify-between bg-gray-100 p-2'>
          <div className='text-sm'> User Manual Page</div>
          <CloseButton handleClick={onDismiss}  />  
        </div>
      {children}
      </dialog>
    </div>,
    document.getElementById('modal-root')
  );
}