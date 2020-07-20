import breakpointDefaultOptions from '../breakpointDefaultOptions';

export default (breakpointOptions = breakpointDefaultOptions) => {
  const mediaConfig = breakpointOptions.map((mediaOptions) => {
    const mediaQueryParams = [];

    // Prepare the media types
    const { minWidth, maxWidth, viewportType } = mediaOptions;

    if (minWidth) {
      mediaQueryParams.push(`(min-width: ${minWidth}px)`);
    }

    if (maxWidth) {
      mediaQueryParams.push(`(max-width: ${maxWidth}px)`);
    }

    let query = mediaQueryParams.join(' and ');

    return {
      viewportType,
      query,
    };
  });
  return mediaConfig;
};
