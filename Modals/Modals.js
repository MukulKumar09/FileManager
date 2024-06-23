import { useContext } from "react";
import { CombinedReducersContext, CombinedDispatchContext } from "../Context/Context"
import ClipboardModal from "./ClipboardModal/ClipboardModal";
import AboutModal from "./AboutModal/AboutModal";
import FavouritesModal from "./FavouritesModal/FavouritesModal";
import ItemExistsModal from "./ItemExistsModal/ItemExistsModal";
import DeleteModal from "./DeleteModal/DeleteModal";
import InputModal from "./InputModal/InputModal";
import OperationWindow from "../Features/OperationWindow/OperationWindow";

export default function Modals(props) {
    const state = useContext(CombinedReducersContext)
    const dispatch = useContext(CombinedDispatchContext)
    return (
        <>
            {state.operationWindow ?
                <OperationWindow />
                : null}
            {state.itemExistsModal ?
                <ItemExistsModal />
                : null}
            {state.inputModal ?
                <InputModal />
                : null}
            {state.deleteModal ?
                <DeleteModal />
                : null}
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