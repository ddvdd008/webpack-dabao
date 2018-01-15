const path = require('path');

/**
 * 便捷求取路径原型函数
 * @param  {String} target
 * @return {String} path to target
 */
String.prototype.join = function (target) {
  return path.join(this.toString(), target);
};

// var ROOT = path.resolve(__dirname, '../..');
const ROOT = path.resolve(__dirname);
module.exports = {
  ROOT: ROOT,                                // 项目根目录
  HTML: ROOT.join('html'),                 // 项目根html目录
  DIST: ROOT.join('dist'),                   // build 后输出目录
//   DOCS: ROOT.join('docs/_book'),             // build 后的文档
  MOCK: ROOT.join('mock'),                   // Mock Server 目录
  APP: ROOT.join('app'),                     // 源码目录
  ASSETS:ROOT.join('assets'),           //项目资源文件目录
  //PAGES: ROOT.join('pages'),                 // 输出的html文件目录
  //SERVICES: ROOT.join('src/services'),       // 服务层
};