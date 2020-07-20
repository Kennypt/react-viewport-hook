const mediaWatcherList = [];

const buildListener = ({ viewportType, mediaListener }) => ({ matches }) => {
  try {
    if (matches) {
      mediaListener(viewportType);
    }
  } catch (error) {
    console.error('react-viewport-hook:matchMedia', error);
  }
};

export const subscribeMediaWatcher = ({ mediaList, mediaListener }) => {
  const { matchMedia } = window || {};

  if (!matchMedia) {
    return false;
  }

  mediaList.forEach(({ query, viewportType }) => {
    const listener = buildListener({ viewportType, mediaListener });

    const mediaWatcher = matchMedia(query);
    mediaWatcher.addListener(listener);
    mediaWatcherList.push({ watcher: mediaWatcher, listener });
  });

  return true;
};

export const unsubscribeMediaWatcher = () => {
  mediaWatcherList.forEach(({ watcher, listener }) => {
    watcher.removeListener(listener);
  });
};

