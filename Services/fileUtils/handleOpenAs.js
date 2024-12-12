import modalPromise from '../../Actions/modalPromise';
import MaterialIcon from '../../Common/MaterialIcon/MaterialIcon';

export default async function handleOpenAs(dispatch, filesList) {
  const lastHighlightedItem = {
    ...filesList.find(item => item.isHighlighted),
  };
  await modalPromise(
    dispatch,
    OpenAs,
    {item: lastHighlightedItem},
    {
      heading: 'Open As...',
      icon: <MaterialIcon name="file-question-outline" />,
    },
  );
}
