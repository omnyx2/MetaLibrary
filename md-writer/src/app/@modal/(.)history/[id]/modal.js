'use client';

import {   useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';

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
        {children}
        <button onClick={onDismiss} className="close-button w-12 h-12 bg-gray-300 " />
      </dialog>
    </div>,
    document.getElementById('modal-root')
  );
}