import {Text, View, ScrollView, Pressable, TextInput} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import styles, {secondaryColor} from '../../styles';
import ContextMenu from '../ContextMenu/ContextMenu';
import CircularButton from '../../Common/CircularButton/CircularButton';
import MaterialIcon from '../../Common/MaterialIcon/MaterialIcon';
import SearchBar from '../SearchBar/SearchBar';

export default function ToolBar(props) {
  const dispatch = useDispatch();
  const state = {
    contextMenu: useSelector(state => state.contextMenu),
    tabs: useSelector(state => state.tabs),
    currentTab: useSelector(state => state.currentTab),
    searchBar: useSelector(state => state.searchBar),
  };

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
        {Boolean(state.searchBar) && <SearchBar />}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={[styles.rowLayout]}>
            <CircularButton
              functionName={() => {
                dispatch({
                  type: 'SEARCHBAR',
                });
              }}
              name="magnify"
            />
            {state.currentTab &&
            state.tabs[state.currentTab]['path'] == 'Home' ? null : (
              <>
                <CircularButton
                  functionName={() => {
                    dispatch({
                      type: 'FUNCTIONID',
                      payload: 0,
                    });
                  }}
                  name="content-copy"
                />
                <CircularButton
                  functionName={() => {
                    dispatch({
                      type: 'FUNCTIONID',
                      payload: 1,
                    });
                  }}
                  name="content-cut"
                />
                <CircularButton
                  functionName={() => {
                    dispatch({
                      type: 'FUNCTIONID',
                      payload: 2,
                    });
                  }}
                  name="delete-outline"
                />
                <CircularButton
                  functionName={() =>
                    dispatch({
                      type: 'FUNCTIONID',
                      payload: 3,
                    })
                  }
                  name="square-edit-outline"
                />
                {/* <CircularButton
                            functionName={() => props.shareFiles()}
                            imageUrl={require('../../assets/share.png')}
                        /> */}
                <Text style={{color: secondaryColor}}> | </Text>
                <CircularButton
                  functionName={() =>
                    dispatch({
                      type: 'FUNCTIONID',
                      payload: 6,
                    })
                  }
                  name="file-plus-outline"
                />
                <CircularButton
                  functionName={() =>
                    dispatch({
                      type: 'FUNCTIONID',
                      payload: 5,
                    })
                  }
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
          onPress={() =>
            dispatch({
              type: 'CONTEXTMENU',
            })
          }>
          <MaterialIcon name="menu" />
        </Pressable>
      </View>
      {Boolean(state.contextMenu) && (
        <ContextMenu
          setContextMenu={props.setContextMenu}
          setClipBoardModal={props.setClipBoardModal}
          setAboutModal={props.setAboutModal}
        />
      )}
    </>
  );
}
