export const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const getBaseUrl = (): string => {
  // if (process.env.NODE_ENV === "development") {
    // return "http://localhost:5000";
  // } else {
  return "https://fathomless-island-04062.herokuapp.com";
  // }
};

export async function linkImg(value: string): Promise<string> {
  const base64Img = await fetch(value).then((res) => {
    if (res.ok) {
      return res.text();
    }
  });

  return base64Img || "";
}
