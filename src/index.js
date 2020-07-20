import { useContext } from 'react';
import ViewportContext, {} from '../components/Context';
export { ViewportProvider } from './components/Context';

export default useViewportType = () => {
  return useContext(ViewportContext);
}
