import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import viewportTypesEnum, { defaultViewportType } from '../enums/viewportTypes';
import capitalizeString from '../utils/capitalizeString';
import checkIfClientSide from '../utils/checkIfClientSide';
import mapServerSideViewportType from '../utils/mapServerSideViewportType';
import findCurrentViewportType from '../utils/findCurrentViewportType';
import mapMediaList from '../utils/mapMediaList';
import { subscribeMediaWatcher, unsubscribeMediaWatcher } from '../utils/mediaWatcher';

const isClientSide = checkIfClientSide();
const defaultViewportTypes = Object.values(viewportTypesEnum);
let mediaList = mapMediaList();

const buildViewportData = (
  viewportType,
  allViewportTypes = defaultViewportTypes
) => {
  const viewportData = {
    viewportType,
    isPhone: false,
    isTablet: false,
    isDesktop: false,
  };

  for (let i = 0; i < allViewportTypes.length; i++) {
    if (allViewportTypes[i] === viewportType) {
      viewportData[`is${capitalizeString(viewportType)}`] = true;
      break;
    }
  }

  return viewportData;
};

const ViewportContext = createContext(buildViewportData(defaultViewportType));

const { Provider } = ViewportContext;

export const ViewportProvider = ({
    children,
    customViewportTypes,
    initialViewportType,
  }) => {
    let viewportTypeValues;
    if (customViewportTypes) {
      mediaList = mapMediaList(customViewportTypes);
      viewportTypeValues = customViewportTypes.map(
        ({ viewportType }) => viewportType
      );
    }

    let currentViewportType = isClientSide
      ? findCurrentViewportType(mediaList)
      : mapServerSideViewportType({
          serverViewportType: initialViewportType,
          mediaList,
          isCustomMediaList: !!customViewportTypes,
        });

    const [viewportData, setViewportData] = useState(
      buildViewportData(currentViewportType, viewportTypeValues)
    );

    useEffect(() => {
      const onScreenChange = (newViewportType) => {
        setViewportData(
          buildViewportData(newViewportType, viewportTypeValues)
        );
      };

      subscribeMediaWatcher({ mediaList, mediaListener: onScreenChange });

      const clientViewportType = findCurrentViewportType(mediaList);
      if (clientViewportType !== currentViewportType) {
        setViewportData(
          buildViewportData(clientViewportType, viewportTypeValues)
        );
      }
      return unsubscribeMediaWatcher;
    });

    return <Provider value={viewportData}>{children}</Provider>;
  };

ViewportProvider.propTypes = {
  initialViewportType: PropTypes.string,
  customViewportTypes: PropTypes.arrayOf(
    PropTypes.shape({
      viewportType: PropTypes.string.isRequired,
      minWith: PropTypes.number,
      maxWidth: PropTypes.number,
    })
  ),
  children: PropTypes.node,
};

ViewportProvider.defaultProps = {
  initialViewportType: defaultViewportType,
  children: null,
  customViewportTypes: undefined,
};

export default ViewportContext;
