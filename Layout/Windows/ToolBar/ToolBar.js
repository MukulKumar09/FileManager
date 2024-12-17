import {memo, lazy, useState, Suspense} from 'react';
import {Text, View, ScrollView} from 'react-native';
import CircularButton from '../../../Common/CircularButton/CircularButton';
import styles, {secondaryColor, textColor} from '../../../styles/styles';
import {useSelector} from 'react-redux';
const Menu = lazy(() => import('./Menu/Menu'));
const SearchBar = lazy(() => import('./SearchBar/SearchBar'));
function ToolBar({
  setOption,
  selectedItems,
  filesList,
  searchBar,
  setSearchBar,
  setFilesList,
  tab,
}) {
  const state = {clipboardItems: useSelector(state => state.clipboardItems)};

  const [menu, setMenu] = useState(false);
  return (
    <>
      <View style={[styles.rowLayout, styles.pill, styles.marginSmall]}>
        {Boolean(menu) && (
          <Suspense>
            <Menu setOption={setOption} setMenu={setMenu} menu={menu} />
          </Suspense>
        )}
        {!tab.isTabberPath && searchBar && (
          <Suspense>
            <SearchBar
              filesList={filesList}
              searchBar={searchBar}
              setSearchBar={setSearchBar}
              setFilesList={setFilesList}
              tab={tab}
            />
          </Suspense>
        )}
        <ScrollView horizontal>
          {!tab.isTabberPath && (
            <View style={[styles.rowLayout]}>
              <CircularButton
                functionName={() => {
                  setOption('search');
                }}
                name="magnify"
              />
              {Boolean(selectedItems) && (
                <>
                  <Text style={{color: secondaryColor}}> | </Text>
                  {selectedItems == 1 && (
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
                      <Text style={{color: secondaryColor}}> | </Text>
                    </>
                  )}
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
