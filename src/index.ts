const getImgColor = (canvas: HTMLCanvasElement, img: HTMLImageElement) => {
  const context = canvas.getContext("2d");
  context?.drawImage(img, 0, 0);
  let pixelData = context?.getImageData(0, 0, canvas.width, canvas.height).data;
  return pixelData;
};

const getMainColor = (src: string): Promise<Map<string, number>> => {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement("canvas");
      const img = new Image();
      img.src = src;
      img.onload = () => {
        const color = getImgColor(canvas, img);
        resolve(translateToRgba(color));
      };
    } catch (e) {
      reject(e);
    }
  });
};

const translateToRgba = (
  color: Uint8ClampedArray | undefined
): Map<string, number> => {
  if (!color) {
    return new Map();
  }
  const rgbaMapCount = new Map();
  let rgba: Array<number | undefined> = [];
  let rgbaStr = "";

  for (let i = 0; i < color.length; i += 4) {
    rgba[0] = color[i];
    rgba[1] = color[i + 1];
    rgba[2] = color[i + 2];
    rgba[3] = color[i + 3];

    if (rgba.indexOf(undefined) !== -1 || color[i + 3] === 0) {
      continue;
    }
    rgbaStr = rgba.join(",");
    if (rgbaMapCount.has(rgbaStr)) {
      const oldCount = rgbaMapCount.get(rgbaStr);
      rgbaMapCount.set(rgbaStr, oldCount + 1);
    } else {
      rgbaMapCount.set(rgbaStr, 1);
    }
  }
  const rgbaArrayCount: [string, number][] = Array.from(rgbaMapCount).sort(
    (a, b) => b[1] - a[1]
  );
  const result = new Map(rgbaArrayCount);
  return result;
};

export default getMainColor;
