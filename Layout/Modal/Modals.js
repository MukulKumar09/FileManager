import {lazy, Suspense} from 'react';
import {useSelector} from 'react-redux';
const ModalTemplate = lazy(() => import('./ModalTemplate'));
export default function Modals() {
  const state = {
    modalStack: useSelector(state => state.modalStack),
    media: useSelector(state => state.media),
  };
  return (
    <>
      {state.modalStack.map(({templateProps, modal}, index) => (
        <Suspense key={index}>
          <ModalTemplate {...templateProps}>{modal}</ModalTemplate>
        </Suspense>
      ))}
    </>
  );
}
