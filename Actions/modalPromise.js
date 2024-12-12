export default async function modalPromise(
  dispatch,
  Component,
  compProps,
  templateProps,
) {
  const promiseWrapper = await new Promise(resolve => {
    const onRequestClose = () => {
      resolve(null);
      dispatch({type: 'POPMODALSTACK'});
    };
    const tempProps = {
      ...templateProps,
      onRequestClose,
    };
    const payload = {
      templateProps: tempProps,
      modal: (
        <Component
          resolve={resolve}
          onRequestClose={onRequestClose}
          {...compProps}
        />
      ),
    };
    dispatch({type: 'PUSHMODALSTACK', payload});
  });
  return promiseWrapper;
}
