import {lazy, Suspense} from 'react';
import {useSelector} from 'react-redux';
const MediaViewer = lazy(() => import('../MediaViewer/MediaViewer'));
export default function MediaViewerWrapper() {
  const state = {
    media: useSelector(state => state.media),
  };
  return (
    <>
      {Boolean(state.media) && (
        <Suspense>
          <MediaViewer media={state.media} />
        </Suspense>
      )}
    </>
  );
}
