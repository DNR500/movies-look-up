const limitWordCount = (text, maxWords) => {
  const array = text.trim().split(' ');
  let returnString = array.slice(0, maxWords).join(' ').trim();

  const lastChar = returnString.substr(returnString.length - 1);
  if (lastChar.match(/(,)/g)) {
    returnString = returnString.substring(0, returnString.length - 1);
  }
  if (array.length > maxWords) {
    if (!lastChar.match(/(\?|!|\.)/g)) {
      returnString += '...';
    }
  }
  return returnString;
};

export default limitWordCount;
