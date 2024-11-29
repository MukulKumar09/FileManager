import {useSelector} from 'react-redux';
import ModalTemplate from './ModalTemplate';
import {useEffect} from 'react';
export default function Modals() {
  const state = {
    modalStack: useSelector(state => state.modalStack),
  };
  // useEffect(() => console.log(state.modalStack.length), [state.modalStack]);
  return (
    <>
      {state.modalStack.map((modalData, index) => (
        <ModalTemplate key={index} index={modalData.id} modalData={modalData} />
      ))}
    </>
  );
}
