import {useSelector, useDispatch} from 'react-redux';
import ClipboardModal from './ClipboardModal/ClipboardModal';
import AboutModal from './AboutModal/AboutModal';
import FavouritesModal from './FavouritesModal/FavouritesModal';
import ItemExistsModal from './ItemExistsModal/ItemExistsModal';
import RecycleBinModal from './RecycleBinModal/RecycleBinModal';
import InputModal from './InputModal/InputModal';
import PropertiesModal from './PropertiesModal/PropertiesModal';
import WebBrowserModal from './WebBrowserModal/WebBrowserModal';
import AllTabsModal from './AllTabsModal/AllTabsModal';
import TextEditorUnsavedModal from './TextEditorUnsavedModal/TextEditorUnsavedModal';
import OpenAsModal from './OpenAsModal/OpenAsModal';
import DeleteModal from './DeleteModal/DeleteModal';
import TextEditor from '../Features/TextEditor/TextEditor';
import TabsContextMenu from '../Layout/Tabs/TabsContextMenu/TabsContextMenu';

export default function Modals(props) {
  const state = {
    itemExistsModal: useSelector(state => state.itemExistsModal),
    inputModal: useSelector(state => state.inputModal),
    recycleBinModal: useSelector(state => state.recycleBinModal),
    deleteModal: useSelector(state => state.deleteModal),
    clipBoardModal: useSelector(state => state.clipBoardModal),
    aboutModal: useSelector(state => state.aboutModal),
    favouritesModal: useSelector(state => state.favouritesModal),
    propertiesModal: useSelector(state => state.propertiesModal),
    webBrowserModal: useSelector(state => state.webBrowserModal),
    tabsContextMenu: useSelector(state => state.tabsContextMenu),
    allTabsModal: useSelector(state => state.allTabsModal),
    textEditorModal: useSelector(state => state.textEditorModal),
    textEditorUnsavedModal: useSelector(state => state.textEditorUnsavedModal),
    openAsModal: useSelector(state => state.openAsModal),
  };
  return (
    <>
      {Boolean(state.inputModal) && <InputModal />}
      {Boolean(state.recycleBinModal) && <RecycleBinModal />}
      {Boolean(state.deleteModal) && <DeleteModal />}
      {Boolean(state.itemExistsModal) && <ItemExistsModal />}
      {Boolean(state.favouritesModal) && <FavouritesModal />}
      {Boolean(state.clipBoardModal) && (
        <ClipboardModal
          setClipBoardModal={props.setClipBoardModal}
          setShowPaste={props.setShowPaste}
          setForceRefresh={props.setForceRefresh}
          clipboardItems={props.clipboardItems}
          inputRef={props.inputRef}
        />
      )}
      {Boolean(state.aboutModal) && (
        <AboutModal setAboutModal={props.setAboutModal} />
      )}
      {Boolean(state.propertiesModal) && <PropertiesModal />}
      {Boolean(state.webBrowserModal) && <WebBrowserModal />}
      {Boolean(state.tabsContextMenu) && <TabsContextMenu />}
      {Boolean(state.allTabsModal) && <AllTabsModal />}
      {Boolean(state.textEditorUnsavedModal) && <TextEditorUnsavedModal />}
      {Boolean(state.textEditorModal) && <TextEditor />}
      {Boolean(state.openAsModal) && <OpenAsModal />}
    </>
  );
}
