import {useSelector} from 'react-redux';
import ModalTemplate from './ModalTemplate';
export default function Modals() {
  const state = {
    modalStack: useSelector(state => state.modalStack),
  };
  return (
    <>
      {state.modalStack.map(({templateProps, modal}, index) => (
        <ModalTemplate key={index} {...templateProps}>
          {modal}
        </ModalTemplate>
      ))}
    </>
  );
}
