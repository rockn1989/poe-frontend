export function hightLightWord(baseWord: string, query: string) {
  if (!query || query.length === 0) return baseWord;

  const regex = new RegExp(`(${query})`, "gi");

  const result = baseWord.replace(
    regex,
    `<mark class="highlight">$1</mark></div>`
  );

  return result;
}
