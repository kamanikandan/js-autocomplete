let searchText = document.getElementById("searchText");
let searchResults = document.getElementById("searchResults");
let countries = [];
fetchCountries();
//Fetch Countries
async function fetchCountries() {
  let response = await fetch("./data/countries.json");
  let results = await response.json();
  countries = results;
}
//Search Country
let searchCountries = searchText => {
  let regEx = new RegExp(`^${searchText}`, "gi");
  let filteredCountries = countries.filter(country => {
    return (
      country.countryName.match(regEx) ||
      country.countryCode.match(regEx) ||
      country.continentName.match(regEx)
    );
  });
  const renderHtml = filteredCountries
    .map(country => {
      return `
        <div class="country-row">
            <h2><span>${country.countryCode}:</span> ${country.countryName} <span class="continent">Continent: ${country.continentName}</span></h2>
            <p>Population: ${country.population}</p>
        </div>
      `;
    })
    .join("");
  if (searchText.length == 0) searchResults.innerHTML = "";
  else if (searchText.length != 0 && filteredCountries.length == 0)
    searchResults.innerHTML = "<p class='result-notfound'>No Match found!</p>";
  else searchResults.innerHTML = renderHtml;
};

searchText.addEventListener("input", () => searchCountries(searchText.value));
