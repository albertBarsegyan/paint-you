import{r as s,D as r}from"./index-CyKPuI_L.js";const c=()=>{const t=s.useContext(r);if(t===void 0)throw new Error("useDrawing must be used within a DrawingProvider");return t},h=(t,n)=>{if(n.points.length!==0){t.strokeStyle=n.color,t.lineWidth=n.size,t.lineCap="round",t.beginPath(),t.moveTo(n.points[0].x,n.points[0].y);for(let i=1;i<n.points.length;i++)t.lineTo(n.points[i].x,n.points[i].y);t.stroke()}},d=t=>{const n=t.width,i=t.height,a=t.getContext("2d"),o=a==null?void 0:a.getImageData(0,0,n,i);if(!(o!=null&&o.data))return;let e=`<svg xmlns="http://www.w3.org/2000/svg" width="${n}" height="${i}">`;return e+='<foreignObject width="100%" height="100%">',e+='<div xmlns="http://www.w3.org/1999/xhtml">',e+=`<canvas id="canvas" width="${n}" height="${i}"></canvas>`,e+="<script>",e+="(function() {",e+="const canvas = document.getElementById('canvas');",e+="const ctx = canvas.getContext('2d');",e+=`const imageData = new ImageData(new Uint8ClampedArray(${JSON.stringify(Array.from(o.data))}), ${n}, ${i});`,e+="ctx.putImageData(imageData, 0, 0);",e+="})();",e+="<\/script>",e+="</div>",e+="</foreignObject>",e+="</svg>",e},w=(t,n)=>{const i=t.getBoundingClientRect();return{x:n.clientX-i.left,y:n.clientY-i.top}};export{d as c,h as d,w as g,c as u};
