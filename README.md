# get-img-color

## 作用

获取图片中的主要颜色，（按颜色出现次数排序）

## 安装

```
npm install get-image-color
```

## 使用

```JavaScript
//返回Promise<Map<rgba:string, count:number>>,按照出现次数排序
const color = getImgColor(imgSrc).then().catch(e){}
```

[DEMO](https://codesandbox.io/s/vibrant-keldysh-szy3q?file=/src/App.js)
