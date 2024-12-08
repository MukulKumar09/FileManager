import {memo} from 'react';
import {Text, View, ScrollView} from 'react-native';
import CircularButton from '../../../Common/CircularButton/CircularButton';
import styles, {secondaryColor, textColor} from '../../../styles/styles';
import {useSelector} from 'react-redux';
import SearchBar from './SearchBar/SearchBar';
function ToolBar({
  setOption,
  searchBar,
  setSearchBar,
  isPathHome,
  setFilesList,
  tab,
}) {
  const state = {clipboardItems: useSelector(state => state.clipboardItems)};

  return (
    <>
      <View
        style={[
          styles.rowLayout,
          styles.pill,
          styles.marginSmall,
          {
            overflow: 'hidden',
          },
        ]}>
        {searchBar && (
          <SearchBar
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
          functionName={() => setOption('favourtes')}
          name="heart"
          color="#FF5252"
        />
        <CircularButton functionName={() => setOption('menu')} name="menu" />
      </View>
    </>
  );
}
export default memo(ToolBar);
