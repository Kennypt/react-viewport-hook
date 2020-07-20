import breakpointDefaultOptions from '../breakpointDefaultOptions';
import { defaultViewportType } from '../enums/viewportTypes';

export default ({
  serverViewportType = defaultViewportType,
  mediaList,
  isCustomMediaList
}) => {
  // If custom breakpoint options
  if (isCustomMediaList && mediaList && mediaList.length) {
    const defaultViewportData = breakpointDefaultOptions.find(
      ({ viewportType }) => serverViewportType === viewportType
    );
    const newViewportData = mediaList.find(
      (mediaOptions) => defaultViewportData.minWidth <= mediaOptions.minWidth
    );

    if (newViewportData) {
      return newViewportData.viewportType;
    }

    const desktopCustomMedia = mediaList.sort(
      (a, b) => a.minWidth < b.minWidth
    )[0];

    if (desktopCustomMedia) {
      return desktopCustomMedia.viewportType;
    }
  }

  return serverViewportType;
};
