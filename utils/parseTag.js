const parseTag = (token, limit) => {
  const nextPage = +token.split('#')[1];
  const isExist = !!nextPage && nextPage <= limit;

  return { nextPage, isExist };
};

const parseMessage = ({ text, limit }) => {
  const hashtag = /(#\d+)/g;
  const matchTags = [...text.matchAll(hashtag)];

  return { matchTags, text, limit };
};

const checkIsQuestion = ({ matchTags, text, limit }) => {
  const tags = matchTags.map((tag) => tag[0]);
  const questions = tags.length
    ? tags.filter((tag) => {
      const { isExist } = parseTag(tag, limit);

      return isExist;
    })
    : false;

  return {
    isQuestion: !!questions.length, text, matchTags, tags,
  };
};

const getSliceIndex = ({
  isQuestion, text, matchTags, tags,
}) => {
  if (!isQuestion) return { isQuestion };
  const sliceIndex = matchTags.reduce((result, tag) => {
    const { index } = tag;
    const lastIndex = tag[0].length + index;

    if (index) result.push(index);
    result.push(lastIndex);

    return result;
  }, [0]);
  return {
    isQuestion, sliceIndex, text, tags,
  };
};

const getToken = ({
  isQuestion, sliceIndex, text, tags,
}) => (!isQuestion ? null
  : sliceIndex.reduce((array, start, index, origin) => {
    const last = origin[index + 1];
    const token = text.substring(start, last);
    const isQtag = !!tags.includes(token);
    const id = index + token;

    array.push({ id, token, isQtag });

    return array;
  }, []));

export {
  parseTag,
  parseMessage,
  checkIsQuestion,
  getSliceIndex,
  getToken,
};
