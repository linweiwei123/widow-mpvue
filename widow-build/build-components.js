const fs = require('fs');
const path = require('path');
const uppercamelize = require('uppercamelcase');
const chalk = require('chalk');

// components path
const componentsPath = path.join(__dirname,'../lib');
const version = '1.0.0';

// filter components,remove file and unneeded directory
const components = fs.readdirSync(componentsPath);
const uninstall = ['common', 'widow-css'];
const compFiltered = components.filter(item=>{
  let stats = fs.statSync(path.join(componentsPath,item));
  return stats.isDirectory() && uninstall.indexOf(item)===-1;
});

function buildIndexJS(){
  // get import content
  const importList = compFiltered.map(item=>{
    return  `import ${uppercamelize(item)} from './${item}/index';`;
  });
  const importListStr = importList.join('\n');

  // get export content
  const exportList = compFiltered.map(item=>{
    return uppercamelize(item);
  });
  exportList.push('install');

  const exportListStr =  `export { 
  ${exportList.join(',\n  ')} 
}`;

  const content = `${importListStr}
  
const version = '1.0.0';
  
function install(Vue){
  Vue.prototype.getComponentByTag = (parent, tag) => {
    for (let c of parent.$children) {
      if (c.$options._componentTag === tag) {
        return c
      }
    }
  }
}

${exportListStr}
  `;

  fs.unlink(path.join(componentsPath,'index.js'),()=>{
    fs.writeFileSync(path.join(componentsPath,'index.js'),content);
    console.log(chalk.green('构建index.js完成'));
  });
}

buildIndexJS();
