import { defaultViewportType } from '../enums/viewportTypes';

export default (mediaList) => {
  const { matchMedia } = window || {};

  if (!matchMedia) {
    return defaultViewportType;
  }

  const breakpointData = mediaList.find(
    ({ query }) => query && matchMedia(query).matches
  );

  if (!breakpointData) {
    return defaultViewportType;
  }

  return breakpointData.viewportType;
};
