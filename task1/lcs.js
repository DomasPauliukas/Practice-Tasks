let a=process.argv.slice(2),r=""
a.length&&(()=>
  {let s=a[0];for(let i=0;i<s.length;i++)for(let j=i+1;j<=s.length;j++){let t=s.slice(i,j);t.length>r.length&&a.every(x=>x.includes(t))&&(r=t)}})()
console.log(r)