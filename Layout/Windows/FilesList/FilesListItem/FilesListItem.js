import {Pressable, Text} from 'react-native';
import styles from '../../../../styles/styles';

export default function FilesListItem({
  item,
  handlePress,
  handleLongPress,
  isHighlighted,
}) {
  return (
    <Pressable
      key={item.path}
      onPress={() => {
        handlePress(item);
      }}
      onLongPress={e => {
        handleLongPress(e, item);
      }}
      style={[isHighlighted && styles.bordered]}>
      <Text>{item.name}</Text>
    </Pressable>
  );
}
