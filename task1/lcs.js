let a=process.argv.slice(2),r=""
if(a.length){
  let s=a[0]
  for(let i=0;i<s.length;i++)for(let j=i+1;j<=s.length;j++){
    let sub=s.slice(i,j)
    if(sub.length>r.length&&a.every(x=>x.includes(sub)))r=sub
  }
}
console.log(r)