let f1='./dist/index.js',s1=require('fs').readFileSync(f1,'utf8');require('fs').writeFileSync(f1,s1.replace(/(PRAGMA foreign_keys=OFF'\);\s*)await dbConnection\.runMigrations\(\)/,'\$1/* migrations handled by synchronize */'))
let f2='./dist/datasource.js',s2=require('fs').readFileSync(f2,'utf8');require('fs').writeFileSync(f2,s2.replace('synchronize: false','synchronize: true'))
