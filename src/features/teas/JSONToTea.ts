import { Tea } from './teasSlice';

const isTea = (data: unknown): data is Tea => {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  if (
    !('id' in data) ||
    !('duration' in data) ||
    !('name' in data) ||
    !('brand' in data) ||
    !('temperature' in data) ||
    !('startedTimestamp' in data) ||
    !('notificationId' in data)
  ) {
    return false;
  }

  return true;
};

export const JSONToTea = (data: unknown): Tea => {
  if (!isTea(data)) {
    throw Error(`Could not create a tea from given data ${data}`);
  }

  return {
    id: data.id,
    name: data.name,
    brand: data.brand,
    temperature: data.temperature,
    duration: data.duration,
    notificationId: data.notificationId,
    startedTimestamp: data.startedTimestamp,
  };
};
