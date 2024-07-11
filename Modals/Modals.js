import { useSelector, useDispatch } from "react-redux"
import ClipboardModal from "./ClipboardModal/ClipboardModal";
import AboutModal from "./AboutModal/AboutModal";
import FavouritesModal from "./FavouritesModal/FavouritesModal";
import ItemExistsModal from "./ItemExistsModal/ItemExistsModal";
import DeleteModal from "./DeleteModal/DeleteModal";
import InputModal from "./InputModal/InputModal";
import PropertiesModal from "./PropertiesModal/PropertiesModal";
import WebBrowserModal from "./WebBrowserModal/WebBrowserModal";
import TabsContextMenu from "../Features/TabsContextMenu/TabsContextMenu";
import AllTabsModal from "./AllTabsModal/AllTabsModal";
import TextEditor from "../Features/TextEditor/TextEditor";
import textEditorUnsavedModal from "../Reducers/textEditorUnsavedModal";
import TextEditorUnsavedModal from "./TextEditorUnsavedModal/TextEditorUnsavedModal";
import OpenAsModal from "./OpenAsModal/OpenAsModal";

export default function Modals(props) {
    const state = {
        itemExistsModal: useSelector(state => state.itemExistsModal),
        inputModal: useSelector(state => state.inputModal),
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
    }
    return (
        <>
            {
                state.inputModal ?
                    <InputModal />
                    : null
            }
            {
                state.deleteModal ?
                    <DeleteModal />
                    : null
            }
            {
                state.itemExistsModal ?
                    <ItemExistsModal />
                    : null
            }
            {
                state.
                    favouritesModal ?
                    <FavouritesModal />
                    : null
            }
            {
                state.clipBoardModal ?
                    <ClipboardModal
                        setClipBoardModal={props.setClipBoardModal}
                        setShowPaste={props.setShowPaste}
                        setForceRefresh={props.setForceRefresh}
                        clipboardItems={props.clipboardItems}
                        inputRef={props.inputRef}
                    />
                    : null
            }
            {
                state.
                    aboutModal ?
                    <AboutModal
                        setAboutModal={props.setAboutModal}
                    />
                    : null
            }
            {state.propertiesModal ?
                <PropertiesModal />
                : null}
            {state.webBrowserModal ?
                <WebBrowserModal />
                : null}
            {state.tabsContextMenu ?
                <TabsContextMenu />
                : null}
            {state.allTabsModal ? <AllTabsModal />
                : null}
            {state.textEditorUnsavedModal ? <TextEditorUnsavedModal />
                : null}
            {state.textEditorModal ? <TextEditor />
                : null}
            {state.openAsModal ? <OpenAsModal />
                : null}
        </>
    )
}