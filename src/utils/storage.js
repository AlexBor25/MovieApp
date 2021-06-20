const storage = () => {
  const saveRating = (id, rating) => {
    localStorage.setItem(id, JSON.stringify(rating));
  };

  const getRating = (id) => JSON.parse(localStorage.getItem(id));
  
  const saveId = (id) => {
    localStorage.setItem('guestId', JSON.stringify(id));
  };

  const getId = () => JSON.parse(localStorage.getItem('guestId'))

  const clearStorage = () => {
    const saveTime = JSON.parse(localStorage.getItem('date'));

    if(saveTime === null){
      localStorage.setItem('date', JSON.stringify(new Date().getTime()));
    } else {
      const dif = new Date().getTime() - saveTime;
      const hours = (dif / (1000 * 60 * 60)).toFixed(1);

      if(hours >= 24) {
        localStorage.clear();
      }
    }
  };

  return {saveRating, getRating, saveId, getId, clearStorage};
}

export default storage;