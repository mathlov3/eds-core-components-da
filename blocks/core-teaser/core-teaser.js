import {
  getBlockRows,
  getBooleanRowContent,
  getLinkTags,
  getPictureTag,
  getTrimmedSimpleRowContent,
  LinkUtils,
} from '../../scripts/utils.js';

const appendImageToRoot = (root, data) => {
  if (!data.image) {
    return;
  }
  const teaserImageElement = document.createElement('div');
  teaserImageElement.classList.add('cmp-teaser__image');
  const imageElement = document.createElement('div');
  imageElement.classList.add('cmp-image');
  imageElement.append(data.image);
  teaserImageElement.append(imageElement);
  root.append(teaserImageElement);
};

const getTeaserData = (block) => {
  const data = {};
  const rows = getBlockRows(block);
  data.linkUrl = getTrimmedSimpleRowContent(rows[0]);
  data.opensNewTab = getBooleanRowContent(rows[1]);
  data.actions = getLinkTags(rows[2]);
  data.pretitle = getTrimmedSimpleRowContent(rows[3]);
  data.title = getTrimmedSimpleRowContent(rows[4]);
  data.description = getTrimmedSimpleRowContent(rows[5]);
  data.id = getTrimmedSimpleRowContent(rows[6]);
  data.image = getPictureTag(rows[7]);
  return data;
};

const appendPretitleToContent = (contentElement, data) => {
  if (!data.pretitle) {
    return;
  }
  const pretitleElement = document.createElement('p');
  pretitleElement.classList.add('cmp-teaser__pretitle');
  pretitleElement.textContent = data.pretitle;
  contentElement.append(pretitleElement);
};

const appendTitleToContent = (contentElement, data) => {
  if (!data.title) {
    return;
  }
  const titleElement = document.createElement('h2');
  titleElement.classList.add('cmp-teaser__title');
  if (LinkUtils.isLinkValid(data.linkUrl)) {
    titleElement.append(LinkUtils.createLinkElement(data.linkUrl, data.opensNewTab ? '_blank' : '_self', data.title, undefined));
  } else {
    titleElement.textContent = data.title;
  }
  contentElement.append(titleElement);
};

const appendDescriptionToContent = (contentElement, data) => {
  if (!data.description) {
    return;
  }
  const descriptionElement = document.createElement('p');
  descriptionElement.classList.add('cmp-teaser__description');
  descriptionElement.textContent = data.description;
  contentElement.append(descriptionElement);
};

const appendActionsToContent = (contentElement, data) => {
  if (!data.actions || data.actions.length === 0) {
    return;
  }
  const actionsElement = document.createElement('div');
  actionsElement.classList.add('cmp-teaser__action-container');
  data.actions.forEach((action) => {
    action.classList.add('cmp-teaser__action-link');
    actionsElement.append(action);
  });
  contentElement.append(actionsElement);
};

const appendContentToRoot = (root, data) => {
  const contentElement = document.createElement('div');
  contentElement.classList.add('cmp-teaser__content');
  appendPretitleToContent(contentElement, data);
  appendTitleToContent(contentElement, data);
  appendDescriptionToContent(contentElement, data);
  appendActionsToContent(contentElement, data);
  root.append(contentElement);
};

const shouldWrapToLink = (data) => LinkUtils.isLinkValid(data.linkUrl)
  && (data.pretitle || data.title || data.description)
  && data.actions.length === 0;

export default function decorate(block) {
  const data = getTeaserData(block);
  const teaserRoot = document.createElement('div');
  let childElementsContainer = teaserRoot;
  teaserRoot.classList.add('cmp-teaser');
  if (data.id) {
    teaserRoot.setAttribute('id', data.id);
  }
  if (shouldWrapToLink(data)) {
    const teaserLinkElement = document.createElement('a');
    teaserLinkElement.classList.add('cmp-teaser__link');
    teaserLinkElement.setAttribute('href', data.linkUrl);
    teaserRoot.append(teaserLinkElement);
    childElementsContainer = teaserLinkElement;
  }
  appendImageToRoot(childElementsContainer, data);
  appendContentToRoot(childElementsContainer, data);
  block.innerHTML = '';
  block.append(teaserRoot);
  block.classList.add('teaser');
}
