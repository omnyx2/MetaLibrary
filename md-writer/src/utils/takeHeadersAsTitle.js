const truncateAtWordBoundary = (str, maxLength) => {
  if (str.length <= maxLength) return str;
  const truncated = str.substring(0, maxLength);
  return truncated.substring(0, Math.min(truncated.length, truncated.lastIndexOf(' ')));
};

function removeLeadingSpacesAndHashes(sentence) {
  return sentence.replace(/^[# ]+/g, '');
}

export const sanitizeTitle = (title) => {
  // Remove leading spaces, special characters, and replace spaces with hyphens
  return title.trim().replace(/^[\s]+/, '') // Remove leading spaces
    .replace(/[#!*%)(]/g, '') // Remove special characters
    .replace(/\s+/g, '-'); // Replace spaces with hyphens
};
export const getFirstLineMax20Chars = (content) => {
    const firstLine = removeLeadingSpacesAndHashes(content.split('\n')[0])
    const truncatedFirstLine = truncateAtWordBoundary(firstLine, 30);
    return { title:  sanitizeTitle(truncatedFirstLine), status: 200 };
};

export function getTitleFromMarkDownOnly(value) {
  return value.split('\n')[0].slice(2,-1)
}