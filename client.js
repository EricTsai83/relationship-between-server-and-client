async function onClick() {
  const response = await fetch("http://localhost:3000/api/cat-names");
  const json = await response.json();
  const { catNames } = json;
  const index = Math.floor(Math.random() * catNames.length);
  const catName = catNames[index];
  document.body.innerText = catName;
}
