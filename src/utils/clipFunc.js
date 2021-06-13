const clipFunc = (str) => {
  let arr2;
  const arr = str.split(" ");
  if (arr.length > 24) arr2 = `${arr.slice(0, 24).join(" ")}...`;
  return arr2;
};

export default clipFunc;