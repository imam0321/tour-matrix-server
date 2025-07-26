export function formatDateReadable(dateInput: string | Date): string {
  return new Date(dateInput).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
