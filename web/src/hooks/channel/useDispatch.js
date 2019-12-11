import { useContext } from 'react';
import { DispatchContext } from '@/contexts';

const useDispatch = () => useContext(DispatchContext);

export default useDispatch;
