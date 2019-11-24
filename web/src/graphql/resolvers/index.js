import { merge } from 'lodash';
import authResolvers from './auth';
import chatResolvers from './chat';

export default merge(authResolvers, chatResolvers);
