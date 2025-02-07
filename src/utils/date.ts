import { format, formatDistanceToNow, subDays } from 'date-fns';

export function getReadableDate(dateString: string): string {
  const createdAtDate = new Date(dateString);
  const now = new Date();

  let formattedDate: string;

  if (subDays(now, 7) < createdAtDate) {
    formattedDate = formatDistanceToNow(createdAtDate, { addSuffix: true });
  } else if (subDays(now, 1) < createdAtDate) {
    formattedDate = `1 day ago at ${format(createdAtDate, 'h:mm a')}`;
  } else {
    formattedDate = format(createdAtDate, 'MMMM d, yyyy h:mm a');
  }

  return formattedDate;
}
