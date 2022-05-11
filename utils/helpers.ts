// format text and remove html tags
export const formatText = (text: string) => {
  // remove &quot; and apostrophe &#039;
  text = text.replace(/&quot;/g, '"');
  text = text.replace(/&#039;/g, "'");
  // remove html tags
  text = text.replace(/<\/?[^>]+(>|$)/g, '');

  return text;
}
