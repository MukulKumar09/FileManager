import {memo} from 'react';
import {Text, View, ScrollView, Pressable} from 'react-native';
import CircularButton from '../../../Common/CircularButton/CircularButton';
import MaterialIcon from '../../../Common/MaterialIcon/MaterialIcon';
import styles, {secondaryColor} from '../../../styles/styles';

function ToolBar({setOption}) {
  console.log('toolbar');
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
        <ScrollView horizontal>
          <View style={[styles.rowLayout]}>
            <CircularButton
              functionName={() => {
                setOption('search');
              }}
              name="magnify"
            />
            {/* {state.currentTab &&
            state.tabs[state.currentTab]['path'] == 'Home' ? null : ( */}
            <>
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
                            functionName={() => props?.shareFiles()}
                            imageUrl={require('../../assets/share.png')}
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
            </>
          </View>
        </ScrollView>
        <Text style={{color: secondaryColor}}> | </Text>
        <CircularButton
          functionName={() => setOption('favourtes')}
          name="heart"
          color="#FF5252"
        />
        <Pressable
          style={[styles.pill, styles.text, styles.padding]}
          onPress={() => setOption('menu')}>
          <MaterialIcon name="menu" />
        </Pressable>
      </View>
    </>
  );
}
export default memo(ToolBar);
