import {memo} from 'react';
const renderItem = memo(
  (item, handlePress, handleLongPress, hoveredItem, setHoveredItem) => (
    <FilesListItem
      key={item.path}
      item={item}
      handlePress={handlePress}
      handleLongPress={handleLongPress}
      setHoveredItem={setHoveredItem}
      isHighlighted={item.isHighlighted}
      isHovered={hoveredItem == item}
    />
  ),
);
export default renderItem;
