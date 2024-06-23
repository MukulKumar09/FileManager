export default function useRangeSelect(filesList, selectedItems, item) {
    const lastSelectedItem = selectedItems[selectedItems.length - 1]
    const lastSelectedItemIndexInFilesList = filesList.indexOf(lastSelectedItem)
    const newSelectedItemIndexInFilesList = filesList.indexOf(item)
    if (newSelectedItemIndexInFilesList > lastSelectedItemIndexInFilesList) { //downwards
        for (let i = lastSelectedItemIndexInFilesList + 1; i <= newSelectedItemIndexInFilesList; i++) {
            !selectedItems.includes(filesList[i]) && selectedItems.push(filesList[i])
        }
    } else {
        for (let i = newSelectedItemIndexInFilesList; i <= lastSelectedItemIndexInFilesList - 1; i++) {
            !selectedItems.includes(filesList[i]) && selectedItems.push(filesList[i])
        }
    }
    return selectedItems
}