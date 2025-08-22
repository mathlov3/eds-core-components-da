// eslint-disable-next-line
export const StringUtils = {
  trimToEmpty: (str) => (str || '').trim(),
};

export const LinkUtils = {
  createLinkElement: (href, target, text, id) => {
    const linkElement = document.createElement('a');
    linkElement.classList.add('cmp-title__link');
    linkElement.setAttribute('href', href);
    linkElement.setAttribute('target', target);
    linkElement.textContent = text;
    if (id && !!id.trim()) {
      linkElement.setAttribute('id', id.trim());
    }
    return linkElement;
  },
  createLinkElementWithInnerHtml: (href, target, html, id) => {
    const linkElement = document.createElement('a');
    linkElement.classList.add('cmp-title__link');
    linkElement.setAttribute('href', href);
    linkElement.setAttribute('target', target);
    linkElement.innerHTML = html;
    if (id && !!id.trim()) {
      linkElement.setAttribute('id', id.trim());
    }
    return linkElement;
  },
  isLinkValid: (link) => !!link,
};

export const getSimpleRowContent = (row) => row.innerText;
export const getTrimmedSimpleRowContent = (row) => StringUtils.trimToEmpty(row.innerText);
export const getRowHtml = (row) => row.innerHTML;
export const getBooleanRowContent = (row) => row.innerText && StringUtils.trimToEmpty(row.innerText.toLowerCase()) === 'true';
export const getPictureTag = (row) => row.querySelector('picture');
export const getLinkTags = (row) => row.querySelectorAll('a');

export const getBlockRows = (block) => [...block.children];
