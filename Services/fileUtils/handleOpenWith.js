import useOpenExternally from '../../Hooks/useOpenExternally';

export default function handleOpenWith(dispatch, filesList) {
  const lastHighlightedItem = {
    ...filesList.find(item => item.isHighlighted),
  };
  useOpenExternally(dispatch, lastHighlightedItem);
}
