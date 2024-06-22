import ClipboardModal from "./ClipboardModal/ClipboardModal";
import AboutModal from "./AboutModal/AboutModal";
import InputModal from "./InputModal/InputModal";
import DeleteModal from "./DeleteModal/DeleteModal";
import FavouritesModal from "./FavouritesModal/FavouritesModal";
import ItemExistsModal from "./ItemExistsModal/ItemExistsModal";

export default function Modals(props) {
    return (
        <>
            {/* {
                progressModal == 1 &&
                <ProgressModal />
            } */}
            {
                props.
                    favouritesModal ?
                    <FavouritesModal
                        setFavouritesModal={props.setFavouritesModal}
                        setFavouriteItems={props.setFavouriteItems}
                        favouriteItems={props.favouriteItems}
                        setTabPath={props.setTabPath}
                        showToast={props.showToast}
                    />
                    : null
            }
            {
                props.clipBoardModal ?
                    <ClipboardModal
                        setClipBoardModal={props.setClipBoardModal}
                        setShowPaste={props.setShowPaste}
                        Icon={props.Icon}
                        setForceRefresh={props.setForceRefresh}
                        clipboardItems={props.clipboardItems}
                        inputRef={props.inputRef}
                    />
                    : null
            }
            {
                props.
                    deleteModal ?
                    <DeleteModal
                        setDeleteModal={props.setDeleteModal}
                        clipboardItems={props.clipboardItems}
                        deleteRef={props.deleteRef}
                    />
                    : null
            }
            {
                props.
                    aboutModal ?
                    <AboutModal
                        setAboutModal={props.setAboutModal}
                    />
                    : null
            }
        </>
    )
}