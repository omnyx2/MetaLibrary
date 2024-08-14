import { Modal } from './modal';


export default function HistoryModal({
  params: { id: markdownId },
}) {
    console.log("modality", markdownId)
  return <Modal>{ markdownId }aaa</Modal>;
}