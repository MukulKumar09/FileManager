import RNFS from 'react-native-fs';
import useCache from './useCache';
export default async function useDeleteItems(state, dispatch, selectedItems) {
    let tempRecycleBin = [...state.recycleBin]
    for (item of selectedItems) {
        await RNFS.unlink(item["path"])
        tempRecycleBin = tempRecycleBin.filter((rbItem) => rbItem["path"] !== item["path"])
    }
    await useCache(dispatch, state.tabs[state.currentTab]["path"])
    console.log(tempRecycleBin)
    dispatch({
        type: "SETRECYCLEBIN",
        payload: tempRecycleBin
    })
    dispatch({
        type: "TOAST",
        payload: 'Item(s) deleted.'
    })
}