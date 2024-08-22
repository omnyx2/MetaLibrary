import { Modal } from './modal';
import DynamicIframe from '@/components/DynamicIframe';
 

const UserManualPage = () => {
  return (
    <div className='w-[70vw] h-[70vh]'>
       <DynamicIframe
              src="https://mdxeditor.dev/editor/docs/getting-started" // Replace with your desired URL
              width="100%"
              height="100%"
      ></DynamicIframe>
    </div>
  )
}

export default function UserManualModal() {
  return <Modal><UserManualPage/></Modal>;
}