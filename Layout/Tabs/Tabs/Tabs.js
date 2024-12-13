import {ScrollView, View} from 'react-native';
import styles from '../../../styles/styles';
import TabButton from '../../../Common/TabButton/TabButton';
import {memo, useEffect, useState} from 'react';
function Tabs({
  tabs,
  handleScroll,
  currentTab,
  tabLayouts,
  setLayouts,
  handleDeleteTab,
}) {
  const [tabLayout, setTabLayout] = useState(0);
  useEffect(() => {
    if (tabLayout) {
      const {index, layout} = tabLayout;

      setLayouts({
        ...tabLayouts,
        [index]: {
          ...layout,
          xWidth: layout.x + layout.width,
        },
      });
    }
  }, [tabLayout]);
  return (
    <ScrollView
      horizontal={true}
      onScroll={handleScroll}
      showsHorizontalScrollIndicator={false}>
      <View style={[styles.rowLayout, styles.mediumGap]}>
        {Object.keys(tabs).map(index => (
          <TabButton
            key={index}
            index={index}
            item={tabs[index]}
            isActive={index == currentTab}
            setTabLayout={setTabLayout}
            handleDeleteTab={handleDeleteTab}
          />
        ))}
      </View>
    </ScrollView>
  );
}
export default memo(Tabs);
