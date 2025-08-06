import {
  getSimpleRowContent,
  LinkUtils,
  StringUtils,
} from '../../scripts/utils.js';

const AVAILABLE_HEADER_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

const getLinkFromRow = (row) => {
  const link = row.querySelector('a');
  if (!link) {
    return null;
  }
  return link.getAttribute('href');
};

const getRootRag = () => {
  const titleRootTag = document.createElement('div');
  titleRootTag.classList.add('cmp-title');
  return titleRootTag;
};

const getHeaderElement = (tagName = '') => {
  let tag = tagName.toLowerCase();
  if (!AVAILABLE_HEADER_TAGS.includes(tagName)) {
    tag = 'h1';
  }
  const header = document.createElement(tag);
  header.classList.add('cmp-title__text');
  return header;
};

export default function decorate(block) {
  const rows = [...block.children];
  const text = StringUtils.trimToEmpty(getSimpleRowContent(rows[0]));
  const headerTag = StringUtils.trimToEmpty(getSimpleRowContent(rows[1]));
  const link = getLinkFromRow(rows[2]);
  const target = StringUtils.trimToEmpty(getSimpleRowContent(rows[3])) === 'true' ? '_blank' : '_self';
  const id = StringUtils.trimToEmpty(getSimpleRowContent(rows[4]));

  const root = getRootRag();
  const header = getHeaderElement(headerTag);
  root.append(header);
  if (LinkUtils.isLinkValid(link)) {
    header.append(LinkUtils.createLinkElement(link, target, text, id));
  } else {
    header.textContent = text;
  }

  block.innerHTML = '';
  block.append(root);
  block.classList.add('title');
}
