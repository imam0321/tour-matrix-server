export function formatDateReadable(dateInput: string | Date): string {
  return new Date(dateInput).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

const now = new Date();
export const sevenDaysAgo = new Date(now).setDate(now.getDate() - 7);
export const thirtyDaysAgo = new Date(now).setDate(now.getDate() - 30);
