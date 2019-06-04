let baseUrlChange;
console.log("全局PRODUCTION:",PRODUCTION);
if(`${PRODUCTION}`=='true'){
  console.log("PRODUCTION:",`${PRODUCTION}`);
  baseUrlChange ='https://territorydataplatformdev.apps.pp01.cnnorth.cf.ford.com.cn';
  console.log("baseUrlChange1:",baseUrlChange);
}else if(`${DEVELEPMENT}`=='true'){
  console.log("DEVELEPMENT:",`${DEVELEPMENT}`);
  baseUrlChange ='https://territorydataplatformdev.apps.pp01.cnnorth.cf.ford.com.cn';
  console.log("baseUrlChange2:",baseUrlChange)
}
export default baseUrlChange;
