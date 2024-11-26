import {Text, View, ScrollView, Pressable} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import styles, {secondaryColor} from '../../styles/styles';
import ContextMenu from '../ContextMenu/ContextMenu';
import CircularButton from '../../Common/CircularButton/CircularButton';
import MaterialIcon from '../../Common/MaterialIcon/MaterialIcon';
import SearchBar from '../SearchBar/SearchBar';
import copyOperation from '../../Common/Operations/copyOperation';
import renameOperation from '../../Common/Operations/renameOperation';
import deleteOperation from '../../Common/Operations/deleteOperation';
import newItemOperation from '../../Common/Operations/newItemOperation';
import {useState} from 'react';

export default function ToolBar(props) {
  const dispatch = useDispatch();
  const state = {
    contextMenu: useSelector(state => state.contextMenu),
    tabs: useSelector(state => state.tabs),
    currentTab: useSelector(state => state.currentTab),
    recycleBin: useSelector(state => state.recycleBin),
  };
  const [searchBar, setSearchBar] = useState(0);

  return (
    <>
      <View
        style={[
          styles.rowLayout,
          styles.paddingCloseBottom,
          styles.pill,
          {
            overflow: 'hidden',
          },
        ]}>
        {Boolean(searchBar) && <SearchBar setSearchBar={setSearchBar} />}
        <ScrollView horizontal>
          <View style={[styles.rowLayout]}>
            <CircularButton
              functionName={() => {
                setSearchBar(1);
              }}
              name="magnify"
            />
            {state.currentTab &&
            state.tabs[state.currentTab]['path'] == 'Home' ? null : (
              <>
                <CircularButton
                  functionName={() => {
                    copyOperation(state, dispatch, props.selectedItems, 0);
                  }}
                  name="content-copy"
                />
                <CircularButton
                  functionName={() => {
                    copyOperation(state, dispatch, props.selectedItems, 1);
                  }}
                  name="content-cut"
                />
                <CircularButton
                  functionName={() => {
                    deleteOperation(state, dispatch, props.selectedItems);
                  }}
                  name="delete-outline"
                />
                <CircularButton
                  functionName={() => {
                    renameOperation(state, dispatch, props.selectedItem);
                  }}
                  name="square-edit-outline"
                />
                {/* <CircularButton
                            functionName={() => props.shareFiles()}
                            imageUrl={require('../../assets/share.png')}
                        /> */}
                <Text style={{color: secondaryColor}}> | </Text>
                <CircularButton
                  functionName={() => newItemOperation(state, dispatch, 1)}
                  name="file-plus-outline"
                />
                <CircularButton
                  functionName={() => newItemOperation(state, dispatch, 0)}
                  name="folder-plus-outline"
                />
              </>
            )}
          </View>
        </ScrollView>
        <Text style={{color: secondaryColor}}> | </Text>
        <CircularButton
          functionName={() =>
            dispatch({
              type: 'FAVOURITESMODAL',
            })
          }
          name="heart"
          color="#FF5252"
        />
        <Pressable
          style={[styles.pill, styles.text, styles.padding]}
          onPress={() => props.setContextMenu(!props.contextMenu)}>
          <MaterialIcon name="menu" />
        </Pressable>
      </View>
      {Boolean(props.contextMenu) && (
        <ContextMenu
          selectedItem={props.selectedItem}
          selectedItems={props.selectedItems}
          setContextMenu={props.setContextMenu}
          setClipBoardModal={props.setClipBoardModal}
          setAboutModal={props.setAboutModal}
        />
      )}
    </>
  );
}
