'use client'
import React from 'react';

export default   function TogglesContainer({children}) {
    return (
        <div className='absolute  top-[3.14rem] left-2 flex w-40 h-40 justify-center'>
            {children}
        </div>
    )
}