export const isBoardStagnates = (prev, next) => {
  return JSON.stringify(prev) === JSON.stringify(next) ? true : false;
};

export const to2DArray = (data, columns) => {
  const newArr = [];
  while (data.length) {
    newArr.push(data.splice(0, columns));
  }
  return newArr;
};

export const to1DArray = (data) => {
  const newArray = data.flat();
  return newArray;
};

export const IN_PROGRESS = "inProgress";
export const STOPPED = "stopped";
export const OSCILLATOR = "oscillator";
export const STILL_LIFE = "stillLife";
export const EMPTY = "empty";

export const getMessage = (state) => {
  switch (state) {
    case STOPPED:
      return null;
    case IN_PROGRESS:
      return "Animation in progress...";
    case OSCILLATOR:
      return "You have found - at least one - oscillator! :)";
    case STILL_LIFE:
      return "Animation stopped - you have found still life(s)! :)";
    case EMPTY:
      return "Everyone died! :(";
    default:
      return null;
  }
};
