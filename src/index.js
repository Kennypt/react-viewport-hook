import { useContext } from 'react';
import ViewportContext, {} from './components/Context';
export { ViewportProvider } from './components/Context';

const useViewportType = () => {
  return useContext(ViewportContext);
};

export default useViewportType;
