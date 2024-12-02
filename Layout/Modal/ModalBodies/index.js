import PasteHere from './PasteHere';
export default function getModal(modalName, resolve, props) {
  switch (modalName) {
    case 'pasteHere': {
      return {
        onRequestClose: resolve(0), //more template props
        component: <PasteHere resolve={resolve} {...props} />,
      };
    }
  }
}
