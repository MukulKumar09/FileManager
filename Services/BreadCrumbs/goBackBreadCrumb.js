export default function goBackBreadCrumb(breadCrumbs) {
  if (breadCrumbs.length == 1) return breadCrumbs;
  const tempBreadCrumbs = [...breadCrumbs];
  tempBreadCrumbs.pop();
  return tempBreadCrumbs;
}
