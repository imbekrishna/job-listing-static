import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const getTagLabel = (
  dataArr: { label: string; value: string }[],
  tagKey: string,
) => {
  return dataArr.find((i) => i.value === tagKey)?.label;
};

export const parseTimeString = (timeString: string, short = true) =>
  dayjs(timeString).fromNow(short);
