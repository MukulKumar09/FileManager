import ClipboardModal from "./ClipboardModal/ClipboardModal";
import AboutModal from "./AboutModal/AboutModal";
import FavouritesModal from "./FavouritesModal/FavouritesModal";

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
                    aboutModal ?
                    <AboutModal
                        setAboutModal={props.setAboutModal}
                    />
                    : null
            }
        </>
    )
}