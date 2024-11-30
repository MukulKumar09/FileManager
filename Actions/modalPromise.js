export default async function modalPromise(dispatch, bodyFunc, ...params) {
  //modalbodies function and its parameters
  const modalPromise = await new Promise(resolve => {
    const payload = bodyFunc(resolve, dispatch, params);
    dispatch({
      type: 'PUSHMODALSTACK',
      payload,
    });
  });
  return modalPromise;
}
