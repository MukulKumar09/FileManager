export default function goBackBreadCrumb(breadCrumbs) {
  const tempBreadCrumbs = [...breadCrumbs];
  tempBreadCrumbs.pop();
  return tempBreadCrumbs;
}
