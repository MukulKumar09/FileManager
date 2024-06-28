import { useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import ClipboardModal from "./ClipboardModal/ClipboardModal";
import AboutModal from "./AboutModal/AboutModal";
import FavouritesModal from "./FavouritesModal/FavouritesModal";
import ItemExistsModal from "./ItemExistsModal/ItemExistsModal";
import DeleteModal from "./DeleteModal/DeleteModal";
import InputModal from "./InputModal/InputModal";

export default function Modals(props) {
    const dispatch = useDispatch()
    const state = {
        itemExistsModal: useSelector(state => state.itemExistsModal),
        inputModal: useSelector(state => state.inputModal),
        deleteModal: useSelector(state => state.deleteModal),
        clipBoardModal: useSelector(state => state.clipBoardModal),
        aboutModal: useSelector(state => state.aboutModal),
        favouritesModal: useSelector(state => state.favouritesModal)
    }
    useEffect(() => console.log(state.inputModal), [state.inputModal])
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
            {/* {
                progressModal == 1 &&
                <ProgressModal />
            } */}
            {
                state.
                    favouritesModal ?
                    <FavouritesModal
                        setFavouritesModal={props.setFavouritesModal}
                        setFavouriteItems={props.setFavouriteItems}
                        favouriteItems={props.favouriteItems}
                        setTabPath={props.setTabPath}
                    />
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
        </>
    )
}