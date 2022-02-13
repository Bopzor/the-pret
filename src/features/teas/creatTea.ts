import { Tea } from './teasSlice';

const isTea = (data: unknown): data is Tea => {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  if (!('id' in data) || !('duration' in data) || !('name' in data) || !('startedTimestamp' in data)) {
    return false;
  }

  return true;
};

export const createTea = (data: unknown): Tea => {
  if (!isTea(data)) {
    throw Error(`Could not create a tea from given data ${data}`);
  }

  return {
    id: data.id,
    name: data.name,
    duration: data.duration,
    startedTimestamp: data.duration,
  };
};
