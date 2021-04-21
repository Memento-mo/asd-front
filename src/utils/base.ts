export const toBase64 = (file: File): unknown =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const getBaseUrl = (): string => {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:5000";
  } else {
    return "";
  }
};

export function linkImg(value: string) {
  return `${getBaseUrl()}/avatar/${value}`;
}
