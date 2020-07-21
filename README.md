<h1 align="center">Welcome to react-viewport-hook 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/react-viewport-hook" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/react-viewport-hook.svg">
  </a>
  <img src="https://img.shields.io/badge/node-%5E12.0.0-blue.svg" />
  <img src="https://img.shields.io/badge/yarn-%5E1.12.0-blue.svg" />
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

```sh
yarn add react-viewport-hook
```

React hook and context provider to give the current defined viewport type based on the current device screen size or when there is a screen resize.
This is useful for scenarios like adaptative react pages where we want to render different components for different viewports and CSS is not a good option (like a dropdown for desktop and a modal for phone).

By default this works with the viewport types:

- `phone`: from 0px to 479px;
- `tablet`: from 480px to 767px;
- `desktop`: from 768px;

But you can customize the viewports to use on the provider component.

## Components

### ViewportProvider

This component updates the viewport type when the screen hits a viewport breakpoint.

**Important!** Your app should only have one viewport provider on the react tree.

#### Props

- `initialViewportType`: desktop by default, this is useful when using it with SSR (server side rendering) and we want to initially use a viewport type based not on the screen size but on the user agent;
- `customViewportTypes`: list of custom viewport types;
- `children`: app component;

#### Usage

When using it with client side or the server always renders the same viewport, you can use as:

```js
  import { ViewportProvider } from 'react-viewport-hook';

  const MainApp = () => (
    <ViewportProvider>
      <App />
    </ViewportProvider>
  );
```

When using with SSR:

```js
  import { ViewportProvider } from 'react-viewport-hook';

  const MainApp = () => (
    <ViewportProvider initialViewportType={serverViewportBasedOnUserAgent}>
      <App />
    </ViewportProvider>
  );
```

When customizing the viewport types:

```js
  import { ViewportProvider } from 'react-viewport-hook';

  return (
    <ViewportProvider customViewportTypes={[
      {
        viewportType: 'smallPhone',
        minWith: 0,
        maxWith: 199,
      },
      {
        viewportType: 'others',
        minWith: 200,
      }
    ]>
      <App />
    </ViewportProvider>
  );
```

### Hook

This component reads the current viewport.

#### Usage

```js
  import useViewportType from 'react-viewport-hook';

  const AdaptativeComponent = () => {
    const { viewportType, isPhone, isTablet, isDesktop } = useViewportType();

    if (isPhone) {
      return (<PhoneComponent />);
    } else if (isTablet) {
      return (<TabletComponent />);
    }

    return (<DesktopComponent />);
  }
```

### Full Example

```js
  import useViewportType, { ViewportProvider } from 'react-viewport-hook';

  const AdaptativeComponent = () => {
    const { isPhone } = useViewportType();

    return isPhone ? <PhoneComponent /> : <DesktopComponent />;
  }

  const Component = () => (
    <ViewportProvider>
      <AdaptativeComponent />
    </ViewportProvider>
  );
```

## Install

```sh
yarn install
```

## Build

```sh
yarn build
```

## TODO

- Add unit tests
- Upgrade to typescript

## Author

👤 **KennyPT <ricardo.rocha.pinheiro@gmail.com>**

* Github: [@KennyPT](https://github.com/KennyPT)

## Show your support

Give a ⭐️ if this project helped you!
