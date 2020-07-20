import viewportTypes from './enums/viewportTypes'

export default [
  {
    deviceType: viewportTypes.PHONE,
    minWidth: 0,
    maxWidth: 479,
  },
  {
    deviceType: viewportTypes.TABLET,
    minWidth: 480,
    maxWidth: 767,
  },
  {
    deviceType: viewportTypes.DESKTOP,
    minWidth: 768,
  },
];
