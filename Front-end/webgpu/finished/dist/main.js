(()=>{"use strict";const e="struct TransformData {\r\n    model: mat4x4<f32>,\r\n    view: mat4x4<f32>,\r\n    projection: mat4x4<f32>,\r\n};\r\n@binding(0) @group(0) var<uniform> transformUBO: TransformData;\r\n@binding(1) @group(0) var myTexture: texture_2d<f32>;\r\n@binding(2) @group(0) var mySampler: sampler;\r\n\r\nstruct Fragment {\r\n    @builtin(position) Position : vec4<f32>,\r\n    @location(0) TexCoord : vec2<f32>\r\n};\r\n\r\n@vertex\r\nfn vs_main(@location(0) vertexPostion: vec3<f32>, @location(1) vertexTexCoord: vec2<f32>) -> Fragment {\r\n\r\n    var output : Fragment;\r\n    output.Position = transformUBO.projection * transformUBO.view * transformUBO.model * vec4<f32>(vertexPostion, 1.0);\r\n    output.TexCoord = vertexTexCoord;\r\n\r\n    return output;\r\n}\r\n\r\n@fragment\r\nfn fs_main(@location(0) TexCoord : vec2<f32>) -> @location(0) vec4<f32> {\r\n    return textureSample(myTexture, mySampler, TexCoord);\r\n}";class t{constructor(e){const t=new Float32Array([0,0,.5,.5,0,0,-.5,-.5,0,1,0,.5,-.5,1,1]),i=GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST,r={size:t.byteLength,usage:i,mappedAtCreation:!0};this.buffer=e.createBuffer(r),new Float32Array(this.buffer.getMappedRange()).set(t),this.buffer.unmap(),this.bufferLayout={arrayStride:20,attributes:[{shaderLocation:0,format:"float32x3",offset:0},{shaderLocation:1,format:"float32x2",offset:12}]}}}var i=1e-6,r="undefined"!=typeof Float32Array?Float32Array:Array;function n(){var e=new r(16);return r!=Float32Array&&(e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0),e[0]=1,e[5]=1,e[10]=1,e[15]=1,e}Math.random,Math.PI,Math.hypot||(Math.hypot=function(){for(var e=0,t=arguments.length;t--;)e+=arguments[t]*arguments[t];return Math.sqrt(e)});var a=function(e,t,i,r){return new(i||(i=Promise))((function(n,a){function o(e){try{u(r.next(e))}catch(e){a(e)}}function s(e){try{u(r.throw(e))}catch(e){a(e)}}function u(e){var t;e.done?n(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(o,s)}u((r=r.apply(e,t||[])).next())}))};class o{initialize(e,t){return a(this,void 0,void 0,(function*(){const i=yield fetch(t),r=yield i.blob(),n=yield createImageBitmap(r);yield this.loadImageBitmap(e,n),this.view=this.texture.createView({format:"rgba8unorm",dimension:"2d",aspect:"all",baseMipLevel:0,mipLevelCount:1,baseArrayLayer:0,arrayLayerCount:1}),this.sampler=e.createSampler({addressModeU:"repeat",addressModeV:"repeat",magFilter:"linear",minFilter:"nearest",mipmapFilter:"nearest",maxAnisotropy:1})}))}loadImageBitmap(e,t){return a(this,void 0,void 0,(function*(){const i={size:{width:t.width,height:t.height},format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT};this.texture=e.createTexture(i),e.queue.copyExternalImageToTexture({source:t},{texture:this.texture},i.size)}))}}var s=function(e,t,i,r){return new(i||(i=Promise))((function(n,a){function o(e){try{u(r.next(e))}catch(e){a(e)}}function s(e){try{u(r.throw(e))}catch(e){a(e)}}function u(e){var t;e.done?n(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(o,s)}u((r=r.apply(e,t||[])).next())}))};const u=document.getElementById("gfx-main"),c=new class{constructor(e){this.t=0,this.render=()=>{this.t+=.01,this.t>2*Math.PI&&(this.t-=2*Math.PI);const e=n();!function(e,t,i,r,n){var a,o=1/Math.tan(t/2);e[0]=o/i,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=o,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=-1,e[12]=0,e[13]=0,e[15]=0,null!=n&&n!==1/0?(a=1/(r-n),e[10]=(n+r)*a,e[14]=2*n*r*a):(e[10]=-1,e[14]=-2*r)}(e,Math.PI/4,800/600,.1,10);const t=n();var r,a,o,s,u,c,h,f,d,l,m,v,p,g,y,x,b,M,P,T,B,w,U;r=t,y=(a=[-2,0,2])[0],x=a[1],b=a[2],M=(s=[0,0,1])[0],P=s[1],T=s[2],B=(o=[0,0,0])[0],w=o[1],U=o[2],Math.abs(y-B)<i&&Math.abs(x-w)<i&&Math.abs(b-U)<i?function(e){e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1}(r):(m=y-B,v=x-w,p=b-U,u=P*(p*=g=1/Math.hypot(m,v,p))-T*(v*=g),c=T*(m*=g)-M*p,h=M*v-P*m,(g=Math.hypot(u,c,h))?(u*=g=1/g,c*=g,h*=g):(u=0,c=0,h=0),f=v*h-p*c,d=p*u-m*h,l=m*c-v*u,(g=Math.hypot(f,d,l))?(f*=g=1/g,d*=g,l*=g):(f=0,d=0,l=0),r[0]=u,r[1]=f,r[2]=m,r[3]=0,r[4]=c,r[5]=d,r[6]=v,r[7]=0,r[8]=h,r[9]=l,r[10]=p,r[11]=0,r[12]=-(u*y+c*x+h*b),r[13]=-(f*y+d*x+l*b),r[14]=-(m*y+v*x+p*b),r[15]=1);const G=n();!function(e,t,r,n){var a,o,s,u,c,h,f,d,l,m,v,p,g,y,x,b,M,P,T,B,w,U,G,A,C=n[0],S=n[1],F=n[2],E=Math.hypot(C,S,F);E<i||(C*=E=1/E,S*=E,F*=E,a=Math.sin(r),s=1-(o=Math.cos(r)),u=t[0],c=t[1],h=t[2],f=t[3],d=t[4],l=t[5],m=t[6],v=t[7],p=t[8],g=t[9],y=t[10],x=t[11],b=C*C*s+o,M=S*C*s+F*a,P=F*C*s-S*a,T=C*S*s-F*a,B=S*S*s+o,w=F*S*s+C*a,U=C*F*s+S*a,G=S*F*s-C*a,A=F*F*s+o,e[0]=u*b+d*M+p*P,e[1]=c*b+l*M+g*P,e[2]=h*b+m*M+y*P,e[3]=f*b+v*M+x*P,e[4]=u*T+d*B+p*w,e[5]=c*T+l*B+g*w,e[6]=h*T+m*B+y*w,e[7]=f*T+v*B+x*w,e[8]=u*U+d*G+p*A,e[9]=c*U+l*G+g*A,e[10]=h*U+m*G+y*A,e[11]=f*U+v*G+x*A,t!==e&&(e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15]))}(G,G,this.t,[0,0,1]),this.device.queue.writeBuffer(this.uniformBuffer,0,G),this.device.queue.writeBuffer(this.uniformBuffer,64,t),this.device.queue.writeBuffer(this.uniformBuffer,128,e);const A=this.device.createCommandEncoder(),C=this.context.getCurrentTexture().createView(),S=A.beginRenderPass({colorAttachments:[{view:C,clearValue:{r:0,g:0,b:0,a:1},loadOp:"clear",storeOp:"store"}]});S.setPipeline(this.pipeline),S.setVertexBuffer(0,this.triangleMesh.buffer),S.setBindGroup(0,this.bindGroup),S.draw(3,1,0,0),S.end(),this.device.queue.submit([A.finish()]),requestAnimationFrame(this.render)},this.canvas=e,this.t=0}Initialize(){return s(this,void 0,void 0,(function*(){yield this.setupDevice(),yield this.createAssets(),yield this.makePipeline(),this.render()}))}setupDevice(){var e,t;return s(this,void 0,void 0,(function*(){this.adapter=yield null===(e=navigator.gpu)||void 0===e?void 0:e.requestAdapter(),this.device=yield null===(t=this.adapter)||void 0===t?void 0:t.requestDevice(),this.context=this.canvas.getContext("webgpu"),this.format="bgra8unorm",this.context.configure({device:this.device,format:this.format,alphaMode:"opaque"})}))}makePipeline(){return s(this,void 0,void 0,(function*(){this.uniformBuffer=this.device.createBuffer({size:192,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});const t=this.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX,buffer:{}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{}},{binding:2,visibility:GPUShaderStage.FRAGMENT,sampler:{}}]});this.bindGroup=this.device.createBindGroup({layout:t,entries:[{binding:0,resource:{buffer:this.uniformBuffer}},{binding:1,resource:this.material.view},{binding:2,resource:this.material.sampler}]});const i=this.device.createPipelineLayout({bindGroupLayouts:[t]});this.pipeline=this.device.createRenderPipeline({vertex:{module:this.device.createShaderModule({code:e}),entryPoint:"vs_main",buffers:[this.triangleMesh.bufferLayout]},fragment:{module:this.device.createShaderModule({code:e}),entryPoint:"fs_main",targets:[{format:this.format}]},primitive:{topology:"triangle-list"},layout:i})}))}createAssets(){return s(this,void 0,void 0,(function*(){this.triangleMesh=new t(this.device),this.material=new o,yield this.material.initialize(this.device,"dist/img/chat.jpg")}))}}(u);c.Initialize()})();