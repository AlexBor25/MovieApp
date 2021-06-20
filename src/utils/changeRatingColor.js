const changeRatingColor = (average) => {
  let item;

  if(average >= 0 && average < 3){
    item = {border: '2px solid #E90000'}
  } else if (average >= 3 && average < 5){
    item = {border: '2px solid #E97E00'}
  } else if (average >= 5 && average < 7) {
    item = {border: '2px solid #E9D100'}
  } else {
    item = {border: '2px solid #66E900'}
  }
  return item;
}

export default changeRatingColor;