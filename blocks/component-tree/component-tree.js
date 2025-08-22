const createLinkElement = (href, text) => {
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', href);
  linkElement.textContent = text;

  const liElement = document.createElement('li');
  liElement.append(linkElement);
  if (window.location.pathname === href) {
    liElement.classList.add('active');
  }
  return liElement;
};

const createUlElement = () => {
  const ulElement = document.createElement('ul');
  return ulElement;
};

export default async function decorate(block) {
  const indexPath = '/query-index.json';
  const indexData = await fetch(indexPath);
  const indexJson = await indexData.json();
  const ulElement = createUlElement();
  indexJson.data.forEach((item) => {
    if (item.path.startsWith('/components/')) {
      ulElement.append(createLinkElement(item.path, item.path));
    }
  });
  block.append(ulElement);
}
