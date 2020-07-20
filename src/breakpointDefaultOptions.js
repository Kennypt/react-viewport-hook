import viewportTypes from './enums/viewportTypes'

export default [
  {
    viewportType: viewportTypes.PHONE,
    minWidth: 0,
    maxWidth: 479,
  },
  {
    viewportType: viewportTypes.TABLET,
    minWidth: 480,
    maxWidth: 767,
  },
  {
    viewportType: viewportTypes.DESKTOP,
    minWidth: 768,
  },
];
