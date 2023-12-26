export const convertCurrentTimeToTimeZone = (time, fromTimeZone, toTimeZone) => {
  const date = new Date(time);
  const utcDate = date.toLocaleString('en-US', { timeZone: fromTimeZone });
  const optionsDate = {
    timeZone: toTimeZone,
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  const optionsTime = {
    timeZone: toTimeZone,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  };

  const convertedDate = new Date(utcDate).toLocaleDateString('en-US', optionsDate);
  const convertedTime = new Date(utcDate).toLocaleTimeString('en-US', optionsTime);

  return { convertedDate, convertedTime };
};
