const useGetQuestion = (text) => {
  const regex = /(#\d+)/g;
  const questions = [...text.matchAll(regex)];
  const isQuestion = !!questions.length;
  const tags = questions.map((question) => question[0]);

  if (!isQuestion) return [null];

  const sliceIndex = questions.reduce((result, question) => {
    const { index } = question;
    const lastIndex = question[0].length + index;
    if (index) result.push(index);
    result.push(lastIndex);

    return result;
  }, [0]);

  const tokens = sliceIndex.reduce((array, start, index, origin) => {
    const last = origin[index + 1];
    const token = text.substring(start, last);
    const isQtag = !!tags.includes(token);
    const id = index + token;

    array.push({ id, token, isQtag });

    return array;
  }, []);

  return [tokens];
};

export default useGetQuestion;
