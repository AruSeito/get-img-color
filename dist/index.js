var getImgColor = function (canvas, img) {
    var context = canvas.getContext("2d");
    context === null || context === void 0 ? void 0 : context.drawImage(img, 0, 0);
    var pixelData = context === null || context === void 0 ? void 0 : context.getImageData(0, 0, canvas.width, canvas.height).data;
    return pixelData;
};
var getMainColor = function (src) {
    return new Promise(function (resolve, reject) {
        try {
            var canvas_1 = document.createElement("canvas");
            var img_1 = new Image();
            img_1.crossOrigin = "";
            img_1.src = src;
            img_1.onload = function () {
                var color = getImgColor(canvas_1, img_1);
                resolve(translateToRgba(color));
            };
        }
        catch (e) {
            reject(e);
        }
    });
};
var translateToRgba = function (color) {
    if (!color) {
        return new Map();
    }
    var rgbaMapCount = new Map();
    var rgba = [];
    var rgbaStr = "";
    for (var i = 0; i < color.length; i += 4) {
        rgba[0] = color[i];
        rgba[1] = color[i + 1];
        rgba[2] = color[i + 2];
        rgba[3] = color[i + 3];
        if (rgba.indexOf(undefined) !== -1 || color[i + 3] === 0) {
            continue;
        }
        rgbaStr = rgba.join(",");
        if (rgbaMapCount.has(rgbaStr)) {
            var oldCount = rgbaMapCount.get(rgbaStr);
            rgbaMapCount.set(rgbaStr, oldCount + 1);
        }
        else {
            rgbaMapCount.set(rgbaStr, 1);
        }
    }
    var rgbaArrayCount = Array.from(rgbaMapCount).sort(function (a, b) { return b[1] - a[1]; });
    var result = new Map(rgbaArrayCount);
    return result;
};
export default getMainColor;
//# sourceMappingURL=index.js.map