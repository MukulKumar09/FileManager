import {Pressable, Text} from 'react-native';
import styles from '../../../../styles/styles';

export default function FilesListItem({
  item,
  setHoveredItem,
  isHighlighted,
  isHovered,
}) {
  return (
    <Pressable
      onPressIn={() => setHoveredItem(item)}
      style={[
        isHighlighted && styles.bordered,
        isHovered && styles.listItemSelected,
        {height: 100},
      ]}>
      <Text>{item.name}</Text>
    </Pressable>
  );
}
