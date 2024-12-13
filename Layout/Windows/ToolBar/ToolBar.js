import {memo, useEffect, useState} from 'react';
import {Text, View, ScrollView} from 'react-native';
import CircularButton from '../../../Common/CircularButton/CircularButton';
import styles, {secondaryColor, textColor} from '../../../styles/styles';
import {useSelector} from 'react-redux';
import SearchBar from './SearchBar/SearchBar';
import Menu from './Menu/Menu';
function ToolBar({
  setOption,
  isPathHome,
  selectedItems,
  filesList,
  searchBar,
  setSearchBar,
  setFilesList,
  refresh,
  tab,
}) {
  const state = {clipboardItems: useSelector(state => state.clipboardItems)};

  const [menu, setMenu] = useState(false);

  useEffect(() => {
    if (menu) {
      switch (menu) {
        case 'clipboard': {
          setOption('clipboard');
          break;
        }
        case 'recycleBin': {
          setOption('recycleBin');
          break;
        }
        case 'properties': {
          setOption('properties');
          break;
        }
        case 'refresh': {
          setOption('refresh');
          break;
        }
      }
      menu !== true && setMenu(false);
    }
  }, [menu]);
  return (
    <>
      <View style={[styles.rowLayout, styles.pill, styles.marginSmall]}>
        <Menu menu={menu} setMenu={setMenu} refresh={refresh} />
        {tab.path !== 'Home' && searchBar && (
          <SearchBar
            filesList={filesList}
            searchBar={searchBar}
            setSearchBar={setSearchBar}
            setFilesList={setFilesList}
            tab={tab}
          />
        )}
        <ScrollView horizontal>
          {!isPathHome && (
            <View style={[styles.rowLayout]}>
              <CircularButton
                functionName={() => {
                  setOption('search');
                }}
                name="magnify"
              />
              {Boolean(selectedItems) && (
                <>
                  <CircularButton
                    functionName={() => {
                      setOption('openInNewTab');
                    }}
                    name="tab-plus"
                  />
                  <CircularButton
                    functionName={() => {
                      setOption('openWith');
                    }}
                    name="file-export-outline"
                  />
                  {/* <CircularButton
                    functionName={() => {
                      setOption('openAs');
                    }}
                    name="file-question-outline"
                  /> */}
                  <CircularButton
                    functionName={() => {
                      setOption('copy');
                    }}
                    name="content-copy"
                  />

                  <CircularButton
                    functionName={() => {
                      setOption('move');
                    }}
                    name="content-cut"
                  />
                  {state.clipboardItems.items.length > 0 && (
                    <CircularButton
                      functionName={() => {
                        setOption('paste');
                      }}
                      name="content-paste"
                      color={textColor}
                    />
                  )}

                  <CircularButton
                    functionName={() => {
                      setOption('delete');
                    }}
                    name="delete-outline"
                  />
                  <CircularButton
                    functionName={() => {
                      setOption('rename');
                    }}
                    name="square-edit-outline"
                  />
                </>
              )}
              {/* <CircularButton
                functionName={() => {
                  setOption('share');
                }}
                name="share-variant-outline"
              /> */}
              <Text style={{color: secondaryColor}}> | </Text>

              <CircularButton
                functionName={() => setOption('newFile')}
                name="file-plus-outline"
              />
              <CircularButton
                functionName={() => setOption('newFolder')}
                name="folder-plus-outline"
              />
            </View>
          )}
        </ScrollView>
        <Text style={{color: secondaryColor}}> | </Text>
        <CircularButton
          functionName={() => setOption('favourites')}
          name="heart"
          color="#FF5252"
        />
        <CircularButton
          functionName={() => setMenu(prev => !prev)}
          name="menu"
        />
      </View>
    </>
  );
}
export default memo(ToolBar);
