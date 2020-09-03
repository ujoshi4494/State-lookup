const search = document.getElementById("search");
const matchList = document.getElementById("match-list");

const searchState = async (searchText) => {
  const states = await fetch("../data/states.json");
  const stateJSON = await states.json();
  const regex = new RegExp(`^${searchText}`, "gi");
  let matechedState = stateJSON.data.filter((state) => {
    return state.abbr.match(regex) || state.name.match(regex);
  });
  if (searchText == "") {
    matechedState = [];
    matchList.innerHTML = "";
  }

  renderHTML(matechedState);
};

const renderHTML = (states) => {
  if (states.length > 0) {
    const html = states
      .map(
        (state) => `
      <div className='card card-body mb-1'>
      <h4>
        ${state.name} (${state.abbr})
        <span class='text-primary'>${state.capital}</span>
      </h4>
      <small>Lat : ${state.lat}</small>
      <small>Long : ${state.long}</small>
    </div>
    `
      )
      .join("");
    matchList.innerHTML = html;
  } else {
    matchList.innerHTML = "";
  }
};

search.addEventListener("input", () => {
  searchState(search.value);
});
