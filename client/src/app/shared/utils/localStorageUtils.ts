export const saveStateToLocalStorage = (state) => {
  let hdepot = JSON.parse(localStorage.getItem('hdepot')) || {};
  hdepot = { ...hdepot, ...state };
  localStorage.setItem('hdepot', JSON.stringify(hdepot));
};

export const restoreStateFromLocalStorage = () => {
  let state = JSON.parse(localStorage.getItem('hdepot')) || {};
  return state;
};
