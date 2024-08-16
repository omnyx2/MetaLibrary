import { Modal } from './modal';


const UserManualPage = () => {
  return (
    <div>
      <h1>
        UserManual - Usage
      </h1>
      Header 
    </div>
  )
}

export default function UserManualModal() {
  return <Modal><UserManualPage/></Modal>;
}