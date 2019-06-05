import moment from 'moment';

export function calculatePostTime(createdAt) {
  const time = createdAt !== null && moment.unix(createdAt)
  const timePosted = createdAt !== null && time.fromNow()
  return timePosted
};
