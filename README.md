# canvas-painting
预览地址：https://blog.stormheng.com/canvas-painting/

### 这是第一版

主要实现了
- 颜色的选择
- 橡皮檫
- 一键清除功能
- 随机背景切换

### 第二版计划实现
1. 作品保存到本地

### 未来可能实现
1. 解决手机端兼容问题
2. 演示给其他用户观看

### 待解决问题
- 切换背景后，前一次橡皮檫的颜色会保留
- 尚未适配iPad端

### 已解决问题
- 在移动端会出现上下页面抖动
- 解决方案：在CSS加上以下代码
```css
html,body {
  height: 100%;
  overflow-y: hidden;
}
```
