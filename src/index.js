import { useContext } from 'react';
import ViewportContext, {} from './components/Context';
export { ViewportProvider } from './components/Context';

function useViewportType() {
  const context = useContext(ViewportContext);
  if (context === undefined) {
    throw new Error(
      'useViewportType must be used within a ViewportProvider',
    );
  }
  return context;
};

export default useViewportType;
