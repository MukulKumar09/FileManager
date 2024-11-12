export default function updateBreadCrumbs(breadCrumbs, index) {
  const tempBreadCrumbs = [...breadCrumbs];
  tempBreadCrumbs.length = index + 1;
  return tempBreadCrumbs;
}
