export const getTagLabel = (
  dataArr: { label: string; value: string }[],
  tagKey: string,
) => {
  return dataArr.find((i) => i.value === tagKey)?.label;
};
