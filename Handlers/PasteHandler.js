import CollectAllItemsHandler from "./CollectAllItemsHandler";
import CopyHandler from "./CopyHandler";
import MoveHandler from "./MoveHandler";

export default async function PasteHandler(clipboardItems, operationType, operationDest) {
    let collectedItems = await CollectAllItemsHandler(clipboardItems, operationDest)
    console.log(collectedItems)
    switch (operationType) {
        case 0:
            CopyHandler(collectedItems, operationDest)
            break
        case 1:
            MoveHandler(collectedItems, operationDest)
            break
    }
}