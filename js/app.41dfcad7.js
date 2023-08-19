(function(){var t={2219:function(t,e){"use strict";e["Z"]={GENERAL:{NOT_AVAILABLE:"Сервис временно не доступен"},WEATHER:{ALREADY_ADDED:"Этот город уже добавлен",SUCCESSFULLY_ADDED:"Город успешно добавлен"},CITY:{NOT_FOUND:"Ничего не найдено"},SEARCH_FORM:{MAX_WEATHER_CARD:"Вы добавили максимальное количество локаций",NOT_SELECTED:"Выберите из списка",EMPTY_REQUEST:"Введите запрос"}}},134:function(t,e,i){"use strict";i(6992),i(8674),i(7727);var s=i(9242),n=i(3396);function r(t,e,i,r,a,o){const c=(0,n.up)("router-view"),h=(0,n.up)("page-loader");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n.Wm)(c,null,{default:(0,n.w5)((({Component:t})=>[(0,n.Wm)(s.uT,{mode:"out-in",duration:800},{default:(0,n.w5)((()=>[((0,n.wg)(),(0,n.j4)((0,n.LL)(t)))])),_:2},1024)])),_:1}),(0,n.Wm)(h)],64)}var a=i(7139);function o(t,e,i,s,r,o){const c=(0,n.up)("loader-points-line");return(0,n.wg)(),(0,n.iD)("div",{class:(0,a.C_)(["page-loader",{active:!r.end}])},[(0,n.Wm)(c,{play:!r.stopped,onAnimationEnd:o.loaderEnd},null,8,["play","onAnimationEnd"])],2)}var c=i(771),h={name:"PageLoader",components:{LoaderPointsLine:c.Z},data(){return{stopped:!1,init:!1,end:!1}},methods:{loaderEnd(){this.stopped&&(this.end=!0,this.$emitter.emit("page-loader__loader-loaded",!0))},setPageLoaded(t){this.stopped=t,this.end=!1}},mounted(){this.init=!0,this.$emitter.on("page-loader__page-loaded",this.setPageLoaded)},beforeUnmount(){this.$emitter.off("page-loader__page-loaded",this.setPageLoaded)}},d=i(89);const l=(0,d.Z)(h,[["render",o]]);var u=l,m={name:"App",components:{PageLoader:u}};const p=(0,d.Z)(m,[["render",r]]);var g=p,f=(i(3948),i(2483)),y=(0,f.p7)({history:(0,f.PO)("/weather/"),routes:[{path:"/",name:"home",component:()=>i.e(234).then(i.bind(i,9234))},{path:"/:pathMatch(.*)*",redirect:"/"}]}),x=i(7071),w=i(1373),v={install:t=>{t.config.globalProperties.$emitter=(0,w.Z)()}};const S={ref:"canvas"};function b(t,e,i,s,r,a){return(0,n.wg)(),(0,n.iD)("canvas",S,null,512)}class P{constructor(t,e={}){this.ctx=t,this.x=e.x||0,this.y=e.y||0,this.scale=e.scale||1,this.animation=!0}get animate(){return this.animation}draw(){}update(){}}class E{constructor(t,e={}){this.ctx=t,this.x=e.x||0,this.y=e.y||0,this.scale=e.scale||1}draw(){}update(){}}i(5438);class M{static createLinearGradient(t,{x1:e,y1:i,x2:s,y2:n,colors:r}){const a=t.createLinearGradient(e,i,s,n);return r.forEach((t=>a.addColorStop(t.offset,t.color))),a}static createRadialGradient(t,{x1:e,y1:i,r1:s,x2:n,y2:r,r2:a,colors:o}){const c=t.createRadialGradient(e,i,s,n,r,a);return o.forEach((t=>c.addColorStop(t.offset,t.color))),c}static getRandomInteger(t,e){return Math.floor(t+Math.random()*(e+1-t))}static getRandomIntegerRange(t,e,i){return 1*(Math.random()*(e-t)+t).toFixed(i)}static distance(t,e={x:0,y:0}){return Math.hypot(t.x-e.x,t.y-e.y)}}class A extends E{constructor(t,e={}){super(t,e),this.angle=0,this.stepAngle=.002,this.colors=[{offset:0,color:"#FFCE47"},{offset:1,color:"#FFB300"}],this.bodySetting={radius:27,style:M.createLinearGradient(this.ctx,{x1:0,y1:-13.5,x2:0,y2:13.5,colors:this.colors})},this.raySetting={w:16,h:8,min:{w:8,h:8},origin:{w:16,h:8},step:4e-4,dist:40,num:7,style:M.createLinearGradient(this.ctx,{x1:0,y1:-4,x2:0,y2:4,colors:this.colors})},this.rays=Array.from({length:this.raySetting.num},((t,e)=>{const i=2*Math.PI/this.raySetting.num*e;return{x:Math.cos(i)*this.raySetting.dist,y:Math.sin(i)*this.raySetting.dist,w:this.raySetting.w,h:this.raySetting.h,angle:i,counter:0}}))}draw(){this.ctx.save(),this.ctx.translate(this.x,this.y),this.ctx.scale(this.scale,this.scale),this.ctx.rotate(this.angle),this.ctx.beginPath(),this.ctx.arc(0,0,this.bodySetting.radius,0,2*Math.PI),this.ctx.fillStyle=this.bodySetting.style,this.ctx.fill(),this.ctx.lineWidth=this.raySetting.h,this.ctx.lineCap="round",this.ctx.strokeStyle=this.raySetting.style,this.rays.forEach((t=>{const e=(this.raySetting.origin.w-t.w)/2;this.ctx.translate(t.x,t.y),this.ctx.rotate(t.angle),this.ctx.beginPath(),this.ctx.moveTo(e,0),this.ctx.lineTo(e+t.w,0),this.ctx.stroke(),this.ctx.rotate(-t.angle),this.ctx.translate(-t.x,-t.y)})),this.ctx.restore()}update(t){this.angle+=this.stepAngle*t,this.rays.forEach(((e,i)=>{e.counter+=this.raySetting.step*M.getRandomIntegerRange(1,50)*t,e.w=this.raySetting.min.w+Math.abs(Math.sin(e.counter-i))*(this.raySetting.origin.w-this.raySetting.min.w)}))}}class I extends P{constructor(t,e={}){super(t,e),this.sun=new A(t)}draw(){this.sun.draw()}update(t){this.sun.update(t)}}class C extends E{constructor(t,e={}){super(t,e),this.color=e.color||"#ffffff",this.shadowColors=[{offset:0,color:"rgba(0, 0, 0, 0.1)"},{offset:1,color:"rgba(0, 0, 0, 0)"}],this.circle={L:{x:-27,y:9,r:21,start:Math.PI/2,end:-Math.PI/4},R:{x:32,y:14,r:16,start:1.25*Math.PI,end:Math.PI/2},T:{x:4,y:-6,r:24,start:0,end:2*Math.PI},D:{x:0,y:0,r:24,start:0,end:2*Math.PI}},this.shadowLeft=this.getShadowGradient(-13,-5,0,-8,-8,24,this.ctx),this.shadowRight=this.getShadowGradient(22,0,0,16,-7,24,this.ctx)}getShadowGradient(t,e,i,s,n,r){return M.createRadialGradient(this.ctx,{x1:t,y1:e,r1:i,x2:s,y2:n,r2:r,colors:this.shadowColors})}draw(){const{L:t,R:e,T:i,D:s}=this.circle;this.ctx.save(),this.ctx.translate(this.x,this.y),this.ctx.scale(this.scale,this.scale),this.ctx.beginPath(),this.ctx.arc(t.x,t.y,t.r,t.start,t.end),this.ctx.arc(e.x,e.y,e.r,e.start,e.end),this.ctx.lineTo(t.x,t.y+t.r),this.ctx.fillStyle=this.color,this.ctx.fill(),this.ctx.beginPath(),this.ctx.arc(t.x,t.y,t.r,s.start,s.end),this.ctx.fillStyle=this.shadowLeft,this.ctx.fill(),this.ctx.beginPath(),this.ctx.arc(e.x,e.y,e.r,s.start,s.end),this.ctx.fillStyle=this.shadowRight,this.ctx.fill(),this.ctx.beginPath(),this.ctx.arc(i.x,i.y,i.r,i.start,i.end),this.ctx.fillStyle=this.color,this.ctx.fill(),this.ctx.restore()}}class k extends P{constructor(t,e={}){super(t,e),this.sun=new A(t,{x:30,y:-17,scale:.8}),this.cloud=new C(t)}draw(){this.sun.draw(),this.cloud.draw()}update(t){this.sun.update(t)}}class T extends P{constructor(t,e={}){super(t,e),this.cloud=new C(t),this.animation=!1}draw(){this.cloud.draw()}}class L extends P{constructor(t,e={}){super(t,e),this.cloudFront=new C(t),this.cloudBack=new C(t,{x:10,y:-20,color:"#B7D2EE"}),this.animation=!1}draw(){this.cloudBack.draw(),this.cloudFront.draw()}}class R extends E{constructor(t,e={}){super(t,e),this.w=2,this.h=6,this.speed=e.speed||4,this.timeout=e.timeout||0,this.diffSpeed=.8*this.speed,this.alpha=this.getAlpha(),this.stepY=this.getStepY()}getAlpha(){return M.getRandomIntegerRange(.2,1,1)}getStepY(){return this.speed-this.diffSpeed+this.alpha*this.diffSpeed}reset(t=0,e=0){this.x=t,this.y=e,this.alpha=this.getAlpha(),this.stepY=this.getStepY()}draw(){this.ctx.fillStyle=`rgba(156, 196, 255, ${this.alpha})`,this.ctx.fillRect(this.x,this.y,this.w,this.h)}update(t){this.y+=this.stepY*t}}class D extends E{constructor(t,e={}){super(t,e),this.w=50,this.h=50,this.vh=40,this.num=50,this.cx=this.w/2,this.direction=e.direction||1,this.angle=.2*this.direction,this.drops=Array.from({length:this.num},(()=>new R(t,{x:this.randomX,y:0,timeout:M.getRandomInteger(0,100)})))}get randomX(){return M.getRandomInteger(-this.cx,this.cx)}draw(){this.ctx.translate(this.x,this.y),this.ctx.rotate(this.angle),this.drops.forEach((t=>t.draw())),this.ctx.rotate(-this.angle),this.ctx.translate(-this.x,-this.y)}update(t){this.drops.forEach((e=>{e.timeout>0?e.timeout-=t:e.alpha>0?(e.y>this.vh&&(e.alpha-=.1*t),e.update(t)):e.reset(this.randomX,0)}))}}class O extends P{constructor(t,e={}){super(t,e),this.cloudFront=new C(t),this.cloudBack=new C(t,{x:10,y:-20,color:"#B7D2EE"}),this.rain=new D(t,{x:5,y:15})}draw(){this.cloudBack.draw(),this.rain.draw(),this.cloudFront.draw()}update(t){this.rain.update(t)}}class _ extends P{constructor(t,e={}){super(t,e),this.cloud=new C(t),this.sun=new A(t,{x:30,y:-17,scale:.8}),this.rain=new D(t,{x:5,y:15})}draw(){this.sun.draw(),this.rain.draw(),this.cloud.draw()}update(t){this.sun.update(t),this.rain.update(t)}}class U extends E{constructor(t,e={}){super(t,e),this.timeout=e.timeout||0,this.angle=e.angle||.5*Math.PI,this.speed=1.5,this.diffSpeed=.8*this.speed,this.alpha=this.getAlpha(),this.step=this.getStep(),this.r=this.getRadius()}getAlpha(){return M.getRandomIntegerRange(.2,1,2)}getStep(){return{x:Math.cos(this.angle)*this.getSpeed(),y:Math.sin(this.angle)*this.getSpeed()}}getSpeed(){return this.speed-this.diffSpeed+this.alpha*this.diffSpeed}getRadius(){return 1+this.alpha}reset(t=0,e=0,i=.5*Math.PI){this.x=t,this.y=e,this.alpha=this.getAlpha(),this.r=this.getRadius(),this.angle=i,this.step=this.getStep()}draw(){this.ctx.save(),this.ctx.translate(this.x,this.y),this.ctx.rotate(this.angle),this.ctx.beginPath(),this.ctx.arc(0,0,this.r,0,2*Math.PI),this.ctx.fillStyle=`rgba(255, 255, 255, ${this.alpha})`,this.ctx.fill(),this.ctx.restore()}update(t){this.x+=this.step.x*t,this.y+=this.step.y*t}}class F extends E{constructor(t,e={}){super(t,e),this.w=40,this.h=60,this.angleFrom=.45*Math.PI,this.angleTo=.55*Math.PI,this.particles=Array.from({length:20},(()=>new U(t,{x:this.randomX,y:0,timeout:M.getRandomInteger(0,100),angle:this.randomAngle})))}get randomX(){return M.getRandomInteger(-this.w/2,this.w/2)}get randomAngle(){return M.getRandomIntegerRange(this.angleFrom,this.angleTo,2)}draw(){this.ctx.save(),this.ctx.translate(this.x,this.y),this.particles.forEach((t=>t.draw())),this.ctx.restore()}update(t){this.particles.forEach((e=>{e.timeout>0?e.timeout-=t:e.alpha<0?e.reset(this.randomX,0,this.randomAngle):(e.update(t),e.alpha-=e.y>this.h-10?.05*t:0)}))}}class H extends P{constructor(t,e={}){super(t,e),this.cloudFront=new C(t),this.cloudBack=new C(t,{x:10,y:-20,color:"#B7D2EE"}),this.snow=new F(t,{x:0,y:15})}draw(){this.snow.draw(),this.cloudBack.draw(),this.cloudFront.draw()}update(t){this.snow.update(t)}}class N extends E{constructor(t,e={}){super(t,e),this.roughness=2,this.minHeight=5,this.h=50,this.alpha=1,this.speedOrigin=this.h/5,this.speed=this.speedOrigin,this.numPointsActive=1,this.pos={x:0,y:0},this.points=this.createPoints(),this.destroyed=!1}createPoints(){let t=15,e=this.h,i=[{x:M.getRandomInteger(-10,10),y:0},{x:M.getRandomInteger(-10,10),y:e}];while(e>this.minHeight){const s=[];for(let e=0;e<i.length-1;e++)s.push(i[e],{x:(i[e].x+i[e+1].x)/2+M.getRandomInteger(-1,1)*t,y:(i[e].y+i[e+1].y)/2});s.push(i.pop()),i=s,t/=this.roughness,e/=2}return i}draw(){this.ctx.beginPath(),this.ctx.moveTo(this.points[0].x,this.points[0].y);for(let t=1;t<this.points.length;t++)if(t<=this.numPointsActive)this.ctx.lineTo(this.points[t].x,this.points[t].y);else if(t===this.numPointsActive+1){const e=M.distance(this.pos,this.points[t]);if(0===e){this.ctx.lineTo(this.points[t].x,this.points[t].y),this.numPointsActive=t;continue}const i=Math.atan2(this.points[t].y-this.pos.y,this.points[t].x-this.pos.x),s=e<this.speed?e:this.speed;this.pos.x+=Math.cos(i)*s,this.pos.y+=Math.sin(i)*s,this.ctx.lineTo(this.pos.x,this.pos.y),e<this.speed&&(this.numPointsActive=t)}this.ctx.lineWidth=2,this.ctx.strokeStyle=`rgba(216, 241, 253, ${this.alpha})`,this.ctx.shadowBlur=10,this.ctx.shadowColor=`rgba(216, 241, 253, ${this.alpha})`,this.ctx.stroke()}update(t){this.speed=this.speedOrigin*t,this.points.length-1===this.numPointsActive&&(this.alpha-=.1*t),this.alpha<=0&&(this.destroyed=!0)}}class B extends E{constructor(t,e={}){super(t,e),this.lightning=new N(t),this.timeout=M.getRandomInteger(0,500)}draw(){this.timeout>0||(this.ctx.save(),this.ctx.translate(this.x,this.y),this.lightning.draw(),this.ctx.restore())}reset(){this.lightning=new N(this.ctx),this.timeout=M.getRandomInteger(0,250)}update(t){this.timeout>0?this.timeout-=t:this.lightning.destroyed?this.reset():this.lightning.update(t)}}class j extends P{constructor(t,e={}){super(t,e),this.cloudFront=new C(t),this.cloudBack=new C(t,{x:10,y:-20,color:"#B7D2EE"}),this.lightning=new B(t,{x:0,y:35}),this.rain=new D(t,{x:5,y:15})}draw(){this.lightning.draw(),this.rain.draw(),this.cloudBack.draw(),this.cloudFront.draw()}update(t){this.lightning.update(t),this.rain.update(t)}}class W extends E{constructor(t,e={}){super(t,e),this.settingParticles={num:20,radius:35,speed:.2,color:M.createRadialGradient(t,{x1:0,y1:0,r1:0,x2:0,y2:0,r2:35,colors:[{offset:0,color:"rgba(255,255,255,0.05)"},{offset:1,color:"rgba(255,255,255,0)"}]})},this.particles=Array.from({length:this.settingParticles.num},(()=>{const t=M.getRandomInteger(-30,30),e=M.getRandomInteger(-25,25);return{x:t,y:e,startPoint:{x:t,y:e},endPoint:this.getRandomPosition({x:t,y:e})}}))}getRandomPosition(t){return{x:t.x+M.getRandomInteger(-15,15),y:t.y+M.getRandomInteger(-15,15)}}draw(){this.ctx.fillStyle=this.settingParticles.color,this.particles.forEach((t=>{this.ctx.translate(this.x+t.x,this.y+t.y),this.ctx.beginPath(),this.ctx.arc(0,0,this.settingParticles.radius,0,2*Math.PI),this.ctx.fill(),this.ctx.translate(-(this.x+t.x),-(this.y+t.y))}))}update(t){this.particles.forEach((e=>{const i=M.distance(e,e.endPoint);if(i>0){const s=this.settingParticles.speed*t,n=e.endPoint.x-e.x,r=e.endPoint.y-e.y;e.x+=i>s?n/i*s:n,e.y+=i>s?r/i*s:r}else e.endPoint=this.getRandomPosition(e.startPoint)}))}}class Y extends P{constructor(t,e={}){super(t,e),this.cloud=new C(t),this.sun=new A(t,{x:30,y:-17,scale:.8}),this.mist=new W(t,{x:5,y:55})}draw(){this.sun.draw(),this.cloud.draw(),this.mist.draw()}update(t){this.sun.update(t),this.mist.update(t)}}class G extends E{constructor(t,e={}){super(t,e),this.radius=32,this.gradient=M.createLinearGradient(this.ctx,{x1:-this.radius/2,y1:-this.radius/2,x2:this.radius/2,y2:this.radius/2,colors:[{offset:0,color:"#FFCE47"},{offset:1,color:"#FFB300"}]})}draw(){this.ctx.save(),this.ctx.translate(this.x,this.y),this.ctx.scale(this.scale,this.scale),this.ctx.beginPath(),this.ctx.arc(0,0,this.radius,0,2*Math.PI),this.ctx.fillStyle=this.gradient,this.ctx.fill(),this.ctx.globalCompositeOperation="destination-out",this.ctx.beginPath(),this.ctx.ellipse(-12,-12,this.radius,this.radius-8,.25*-Math.PI,0,2*Math.PI),this.ctx.fillStyle="#fff",this.ctx.fill(),this.ctx.restore()}}class z extends P{constructor(t,e={}){super(t,e),this.crescent=new G(t,{x:0,y:-5}),this.animation=!1}draw(){this.crescent.draw()}}class Z extends P{constructor(t,e={}){super(t,e),this.crescent=new G(t,{x:-33,y:-25,scale:.8}),this.cloud=new C(this.ctx),this.animation=!1}draw(){this.crescent.draw(),this.cloud.draw()}}class $ extends P{constructor(t,e={}){super(t,e),this.cloud=new C(t),this.crescent=new G(t,{x:-33,y:-25,scale:.8}),this.rain=new D(t,{x:5,y:15})}draw(){this.crescent.draw(),this.rain.draw(),this.cloud.draw()}update(t){this.rain.update(t)}}class V extends P{constructor(t,e={}){super(t,e),this.cloud=new C(t),this.crescent=new G(t,{x:-33,y:-25,scale:.8}),this.mist=new W(t,{x:0,y:55})}draw(){this.crescent.draw(),this.cloud.draw(),this.mist.draw()}update(t){this.mist.update(t)}}var K={"01d":I,"02d":k,"03d":T,"03n":T,"04d":L,"04n":L,"09d":O,"09n":O,"10d":_,"11d":j,"11n":j,"13d":H,"13n":H,"50d":Y,"01n":z,"02n":Z,"10n":$,"50n":V,default:k};class X{constructor(t,e){this.ctx=t,this.codeCurrent=e,this.iconCurrent=null,this.update()}get icon(){return this.iconCurrent}get animate(){return this.iconCurrent.animate}get code(){return this.codeCurrent}change(t){this.codeCurrent=t,this.update()}update(){const t=K[this.codeCurrent]||K["default"];this.iconCurrent=new t(this.ctx)}}class q{constructor(t,e,i=!0){this.code=e,this.animate=i,this.cnv=t,this.ctx=this.cnv.getContext("2d"),this.originSize={w:256,h:256},this.cnv.width=this.originSize.w,this.cnv.height=this.originSize.h,this.cx=this.cnv.width/2,this.cy=this.cnv.height/2,this.scale=1,this.styleCss=getComputedStyle(this.cnv),this.iconManager=new X(this.ctx,e),this.init()}init(){this.updateSize(),this.updateView()}get icon(){return this.iconManager.icon}get checkAnimate(){return this.animate&&this.icon.animate&&this.scale>0}get checkVisible(){return"hidden"!==this.styleCss.visibility&&"none"!==this.styleCss.display}get checkResize(){return this.cnv.width!==this.cnv.clientWidth||this.cnv.height!==this.cnv.clientHeight}get checkCodeChange(){return this.code!==this.iconManager.code}changeIcon(){this.iconManager.change(this.code)}changeAnimate(t){this.animate=t}changeCode(t){this.code=t}updateSize(){this.cnv.width=this.cnv.clientWidth,this.cnv.height=this.cnv.clientHeight,this.cx=this.cnv.width/2,this.cy=this.cnv.height/2,this.scale=Math.min(this.cnv.width/this.originSize.w,this.cnv.height/this.originSize.h)}updateView(t=1){this.ctx.setTransform(1,0,0,1,0,0),this.ctx.clearRect(0,0,this.cnv.width,this.cnv.height),this.ctx.translate(this.cx,this.cy),this.ctx.scale(this.scale,this.scale),this.icon.update(t),this.icon.draw()}update(t=1){if(this.checkVisible)if(this.checkCodeChange)this.changeIcon(),this.checkResize&&this.updateSize(),this.updateView(t);else if(this.checkResize)this.updateSize(),this.updateView(t);else{if(!this.checkAnimate)return;this.updateView(t)}}}var J=i(8552);class Q{constructor(){if(Q.instance)return Q.instance;Q.instance=this,this.fps=60,this.fpsInterval=1e3/this.fps,this.maxDelta=1.2,this.updates=new Set,this.listener=this.update.bind(this),this.active=!0,this.init()}init(){J.ZP.ticker.add(this.listener)}destroy(){J.ZP.ticker.remove(this.listener)}start(){this.active=!0}stop(){this.active=!1}add(t){this.updates.add(t)}remove(t){this.updates.delete(t)}update(t,e,i){if(!this.active)return;const s=Math.min(e/this.fpsInterval,this.maxDelta);this.updates.forEach((t=>t(s)))}}const tt=new Q;var et=tt,it={name:"WeatherIcon",props:{code:{type:String,required:!0},animate:{type:Boolean,default:!0}},data(){return{icon:null,iconUpdate:null}},mounted(){this.icon=new q(this.$refs.canvas,this.code,this.animate),this.iconUpdate=this.icon.update.bind(this.icon),et.add(this.iconUpdate)},beforeUnmount(){et.remove(this.iconUpdate)},watch:{code(){this.icon.changeCode(this.code)},animate(){this.icon.changeAnimate(this.animate)}}};const st=(0,d.Z)(it,[["render",b]]);var nt=st,rt={install:t=>{t.component("weather-icon",nt)}},at=(i(8218),i(5431));(0,at.z)("/weather/service-worker.js",{ready(){},registered(){},cached(){},updatefound(){},updated(){window.location.reload()},offline(){},error(t){}});const ot=(0,s.ri)(g);ot.use(x.Z),ot.use(y),ot.use(v),ot.use(rt),ot.mount("#app")},7071:function(t,e,i){"use strict";i.d(e,{Z:function(){return N}});var s=i(65),n=i(4161),r=n.Z.create({timeout:1e4}),a={SERVICES:{YANDEX:{HOST:"https://geocode-maps.yandex.ru/1.x/",API_KEY:"0f424498-5b66-4cf3-8136-f3b9670e9c23"},OPENWEATHERMAP:{HOST:"https://api.openweathermap.org/",API_KEY:"67ef7b95908423081fa4e61545b1810c"}}},o=i(2219);i(1703);class c extends Error{constructor(t){super(t)}}i(5827),i(4916),i(1817),i(5306),i(4603);const h=[{type:"посёлок городского типа",abbr:"пгт"},{type:"садоводческое некоммерческое товарищество",abbr:"снт"},{type:"дачное некоммерческое товарищество",abbr:"днт"},{type:"коттеджный поселок",abbr:"кп"}];function d(t,e){return e.reduce(((t,e)=>t.replace(new RegExp(e.type,"gi"),e.abbr)),t)}var l=t=>({id:Date.now().toString(36)+Math.random().toString(36).substr(2,5),name:d(t.name,h),description:t.description,coord:t.coord}),u=t=>t.response.GeoObjectCollection.featureMember.reduce(((t,e)=>{const i=e.GeoObject.metaDataProperty.GeocoderMetaData.kind,s=e.GeoObject.Point.pos.split(" ");return"locality"!==i&&"province"!==i||t.push(l({name:e.GeoObject.name,description:e.GeoObject.description,coord:{lon:s[0],lat:s[1]}})),t}),[]),m=t=>t.filter((t=>t.state)).map((t=>{var e;return l({name:(null===t||void 0===t||null===(e=t.local_names)||void 0===e?void 0:e.ru)||t.name,description:t.state,coord:{lon:t.lon,lat:t.lat}})}));function p({url:t,dataModel:e}){return r.get(t.path,{params:t.params}).then((t=>{const i=e(t.data);return i.length?Promise.resolve(i):Promise.reject(new c(o.Z.CITY.NOT_FOUND))})).catch((t=>t instanceof c?Promise.reject(t.message):Promise.reject(o.Z.GENERAL.NOT_AVAILABLE)))}var g={getYandex(t){const{HOST:e,API_KEY:i}=a.SERVICES.YANDEX;return p({url:{path:e,params:{geocode:t,apikey:i,format:"json",kind:"locality",results:"5"}},dataModel:u})},getOpenWeatherMap(t){const{HOST:e,API_KEY:i}=a.SERVICES.OPENWEATHERMAP;return p({url:{path:`${e}geo/1.0/direct`,params:{q:t,appid:i,limit:"5",lang:"ru"}},dataModel:m})}},f={newDateInTimezone(t,e=0){return new Date(1e3*(Number(t)+Number(e)))},getHour(t,e=0){const i=this.newDateInTimezone(t,e);return i.getUTCHours()},date(t,e=0){const i=this.newDateInTimezone(t,e),s="ru-RU",n="UTC";return{weekday:i.toLocaleString(s,{weekday:"long",timeZone:n}),monthday:i.toLocaleString(s,{month:"long",day:"2-digit",timeZone:n}),year:""+i.getUTCFullYear()}},time(t,e=0){const i=this.newDateInTimezone(t,e);return i.toLocaleTimeString("RU-ru",{hour:"2-digit",minute:"2-digit",timeZone:"UTC"})},convertUnitCtoF(t){return Math.round(9*t/5+32)},convertUnitHPAtoMMHG(t){return Math.round(.750063755419211*t)},convertUnitMtoKM(t){return Math.round(t/1e3*10)/10},convertUnitMStoKMH(t){return Math.round(3600*t/1e3*10)/10},getPeriodsPattern(){return[{name:"Ночь",from:0,to:5},{name:"Утро",from:6,to:11},{name:"День",from:12,to:17},{name:"Вечер",from:18,to:23}]},getIconInCurrentHour(t,e){const i=this.getPeriodsPattern(),s=t.slice(0,-1);for(let n=0;n<i.length;n++)if(e>=i[n].from&&e<=i[n].to)return n>0&&n<3?s+"d":s+"n";return t},getIconInPeriod(t,e,i,s){const n=t.slice(0,-1);return e>i&&e<s?n+"d":n+"n"}},y=(t,e)=>{e=e||t.timezone;const i={temp:{metric:""+Math.round(t.main.temp),imperial:""+f.convertUnitCtoF(t.main.temp)},tempFeelsLike:{metric:""+Math.round(t.main.feels_like),imperial:""+f.convertUnitCtoF(t.main.feels_like)},pressure:{metric:t.main.pressure,mmHg:f.convertUnitHPAtoMMHG(t.main.pressure)},windSpeed:{m:Math.round(10*t.wind.speed)/10,km:f.convertUnitMStoKMH(t.wind.speed)},visibility:{m:t.visibility,km:f.convertUnitMtoKM(t.visibility)}},s="current"===t.type?f.getIconInPeriod(t.weather[0].icon,t.dt,t.sys.sunrise,t.sys.sunset):f.getIconInCurrentHour(t.weather[0].icon,f.getHour(t.dt,e));return{services:i,icon:""+s,timestamp:""+t.dt,date:f.date(t.dt,e),time:f.time(t.dt,e),temp:""+i.temp.metric,tempFeelsLike:""+i.tempFeelsLike.metric,description:""+t.weather[0].description,windSpeed:""+i.windSpeed.m,pressure:""+i.pressure.metric,humidity:""+t.main.humidity,visibility:""+i.visibility.km,clouds:""+t.clouds.all}},x=t=>y({type:"current",...t});function w(t){var e,i;const s=t.timeList.reduce(((t,e)=>Number(e.services.temp.metric)<Number(t.services.temp.metric)?e:t)),n=t.timeList.reduce(((t,e)=>Number(e.services.temp.metric)>Number(t.services.temp.metric)?e:t)),r={tempMin:s.services.temp,tempMax:n.services.temp};return{services:r,name:t.name,icon:(null===t||void 0===t||null===(e=t.timeList[t.timeList.length-1])||void 0===e?void 0:e.icon)||"",description:(null===t||void 0===t||null===(i=t.timeList[t.timeList.length-1])||void 0===i?void 0:i.description)||"",tempMin:r.tempMin.metric,tempMax:r.tempMax.metric,timeList:t.timeList}}function v(t,e){const i=t.periods.reduce(((t,e)=>Number(e.services.tempMin.metric)<Number(t.services.tempMin.metric)?e:t)),s=t.periods.reduce(((t,e)=>Number(e.services.tempMax.metric)>Number(t.services.tempMax.metric)?e:t)),n={tempMin:i.services.tempMin,tempMax:s.services.tempMax};return{services:n,timestamp:t.timestamp,date:f.date(t.timestamp,e),tempMin:n.tempMin.metric,tempMax:n.tempMax.metric,icon:t.periods[2].icon,description:t.periods[2].description,periods:t.periods}}function S(t,e,i,s){return t.filter((t=>{const n=f.newDateInTimezone(t.dt,s),r=Math.floor(n.getTime()/1e3);return r>=e&&r<i}))}function b(t,e){return t.map((t=>(t.type="forecast",y(t,e))))}function P(t,e){const i=t=>f.newDateInTimezone(t,e).getUTCDate();return t.reduce(((t,e)=>{const s=i(e.timestamp),n=t.find((t=>i(t.timestamp)===s));return n?n.list.push(e):t.push({timestamp:e.timestamp,list:[e]}),t}),[])}function E(t,e){const i=f.getPeriodsPattern();return t.map((t=>({timestamp:t.timestamp,periods:i.map((i=>({name:i.name,timeList:t.list.filter((t=>{const s=f.getHour(t.timestamp,e);return s>=i.from&&s<=i.to}))})))})))}function M(t){return t.map((t=>({timestamp:t.timestamp,periods:t.periods.map((t=>w(t)))})))}function A(t,e){return t.map((t=>v(t,e)))}function I(t,e,i){const s=f.newDateInTimezone(t);return s.setUTCDate(s.getUTCDate()+i),s.setUTCSeconds(s.getUTCSeconds()+e),s.setUTCHours(0,0,0,0),Math.floor(s.getTime()/1e3)}var C=(t,e=new Date)=>{const i=t.city.timezone,s=I(e,i,1),n=I(e,i,5);let r=t.list;return r=S(r,s,n,i),r=b(r,i),r=P(r,i),r=E(r,i),r=M(r),r=A(r,i),r},k=t=>({id:`${t.city.coord.lon},${t.city.coord.lat}`,city:t.city,current:t.current,forecast:t.forecast});const{HOST:T,API_KEY:L}=a.SERVICES.OPENWEATHERMAP;var R={async getAll(t){try{const e=await this.getCurrent(t.coord),i=await this.getForecast(t.coord),s=k({city:t,current:x(e),forecast:C(i,e.dt)});return Promise.resolve(s)}catch(e){return Promise.reject(o.Z.GENERAL.NOT_AVAILABLE)}},getCurrent({lat:t,lon:e}){return r.get(`${T}data/2.5/weather/`,{params:{lat:t,lon:e,appid:L,lang:"ru",units:"metric"}}).then((t=>t.data))},getForecast({lat:t,lon:e}){return r.get(`${T}data/2.5/forecast/`,{params:{lat:t,lon:e,appid:L,lang:"ru",units:"metric"}}).then((t=>t.data))}},D={city:g,weather:R},O={namespaced:!0,actions:{search(t,e){const{current:i,types:s}=t.rootState.settings.userSettings.searchServices,n={[s.yandex]:"getYandex",[s.openweathermap]:"getOpenWeatherMap",default:"getYandex"};return D.city[n[i]||n.default](e)}}},_={namespaced:!0,state:{maxWeatherCard:4,userSettings:{searchServices:{path:"searchServices",current:"openweathermap",types:{yandex:"yandex",openweathermap:"openweathermap"},symbol:{yandex:"Яндекс",openweathermap:"OpenWeatherMap"}},weatherUnits:{temp:{path:"weatherUnits/temp",current:"metric",types:{metric:"metric",imperial:"imperial"},symbol:{metric:"C",imperial:"F"}},pressure:{path:"weatherUnits/pressure",current:"metric",types:{metric:"metric",mmHg:"mmHg"},symbol:{metric:"ГПа",mmHg:"мм рт.ст."}},windSpeed:{path:"weatherUnits/windSpeed",current:"m",types:{m:"m",km:"km"},symbol:{m:"м/с",km:"км/ч"}},visibility:{path:"weatherUnits/visibility",current:"km",types:{m:"m",km:"km"},symbol:{m:"м",km:"км"}}}}},getters:{maxWeatherCard(t){return t.maxWeatherCard},userSettings(t){return t.userSettings},symbolsOfCurrentUserSettings(t){const e=t=>{const i={};for(const n in t){var s;const r=t[n];i[n]=r.hasOwnProperty("current")?(null===(s=r.symbol)||void 0===s?void 0:s[r.current])||"":e(r)}return i};return e(t.userSettings)},localStorageSettings(t){const e=t=>{if(t.hasOwnProperty("current"))return t.current;const i={};for(const s in t)i[s]=e(t[s]);return i};return e(t.userSettings)}},mutations:{changeUserSetting(t,{path:e,value:i}){const s=e.split("/").reduce(((t,e)=>t?t[e]:void 0),t.userSettings);s&&(s.current=s.types[i]||s.current)},localStorageSettings(t,e){const i=[{state:t.userSettings,ls:e}];while(i.length>0){const t=i.pop();for(const e in t.ls){if(!t.state.hasOwnProperty(e))continue;const s=t.state[e],n=t.ls[e];switch(typeof n){case"string":s.current=s.types[n]||s.current;break;case"object":i.push({state:s,ls:n});break}}}}},actions:{changeUserSetting(t,{path:e,value:i}){t.commit("changeUserSetting",{path:e,value:i}),t.commit("weather/updateUnits",t.rootState,{root:!0})},localStorageSettings(t,e){t.commit("localStorageSettings",e),t.commit("weather/updateUnits",t.rootState,{root:!0})}}},U=(i(3948),{namespaced:!0,state:{list:[],basket:[],activeID:null},getters:{basket(t){return t.basket},list(t){return t.list},activeID(t){return t.activeID},localStorageSettings(t){return{active:t.activeID,list:t.list.map((t=>({id:t.id,name:t.city.name,coord:t.city.coord})))}}},mutations:{addBasket(t,e){t.basket.push(e)},clearBasket(t){t.basket.length=0},add(t,e){t.list.push(e)},remove(t,e){t.list=t.list.filter((t=>t.id!==e)),e===t.activeID&&(t.activeID=t.list.length?t.list[0].id:null)},change(t,e){t.activeID=e},updateUnits(t,e){const i=e.settings.userSettings.weatherUnits,s=i.temp.current,n=i.pressure.current,r=i.windSpeed.current,a=i.visibility.current;t.list.forEach((t=>{t.current.temp=t.current.services.temp[s],t.current.tempFeelsLike=t.current.services.tempFeelsLike[s],t.current.pressure=t.current.services.pressure[n],t.current.windSpeed=t.current.services.windSpeed[r],t.current.visibility=t.current.services.visibility[a],t.forecast.forEach((t=>{t.tempMin=t.services.tempMin[s],t.tempMax=t.services.tempMax[s],t.periods.forEach((t=>{t.tempMin=t.services.tempMin[s],t.tempMax=t.services.tempMax[s],t.timeList.forEach((t=>{t.temp=t.services.temp[s],t.tempFeelsLike=t.services.tempFeelsLike[s],t.pressure=t.services.pressure[n],t.windSpeed=t.services.windSpeed[r],t.visibility=t.services.visibility[a]}))}))}))}))}},actions:{addBasket(t,e){t.commit("addBasket",e)},clearBasket(t){t.state.basket.forEach((e=>t.commit("remove",e))),t.commit("clearBasket")},async add(t,{name:e,coord:i}){try{const s=await t.dispatch("getWeather",{name:e,coord:i});return t.commit("add",s),t.commit("updateUnits",t.rootState),t.commit("change",s.id),Promise.resolve(o.Z.WEATHER.SUCCESSFULLY_ADDED)}catch(s){return Promise.reject(s)}},remove(t,e){t.commit("remove",e)},change(t,e){t.commit("change",e)},async getWeather(t,{name:e,coord:i}){try{const s=await D.weather.getAll({name:e,coord:i}),n=t.state.list.find((t=>t.id===s.id));return n?Promise.reject(o.Z.WEATHER.ALREADY_ADDED):Promise.resolve(s)}catch(s){return Promise.reject(o.Z.GENERAL.NOT_AVAILABLE)}},async localStorageSettings(t,e){try{for(const i of e.list){const e=await t.dispatch("getWeather",i);t.commit("add",e),t.commit("updateUnits",t.rootState)}t.commit("change",e.active)}catch(i){console.error(i)}}}}),F={namespaced:!0,state:{loaded:!1},getters:{loaded(t){return t.loaded}},mutations:{loaded(t,e){t.loaded=e}},actions:{async init(t){try{const e={root:!0},i=JSON.parse(localStorage.getItem("root"));i.settings&&t.dispatch("settings/localStorageSettings",i.settings,e),i.weather&&await t.dispatch("weather/localStorageSettings",i.weather,e)}catch(e){localStorage.clear()}finally{t.commit("loaded",!0)}}}},H=(i(8862),i(6699),t=>{t.subscribe((async(e,i)=>{try{if(!i.localstorage.loaded)return;const s=t.getters["weather/localStorageSettings"],n=t.getters["settings/localStorageSettings"];if(localStorage.setItem("root",JSON.stringify({weather:s,settings:n})),"weather/remove"===e.type){const t=s.list.map((({coord:t})=>`lat=${t.lat}&lon=${t.lon}`)),e=await caches.open("weather"),i=await e.keys();for(const s of i){const i=t.some((t=>s.url.includes(t)))?null:s.url;await e.delete(i)}}}catch(s){console.error(s)}}))}),N=(0,s.MT)({modules:{settings:_,weather:U,city:O,localstorage:F},plugins:[H]})},8218:function(t,e,i){i(5827);const s=document.head,n=document.createElement("style"),r=[{name:"vh",value:()=>`${document.documentElement.clientHeight}px`},{name:"vw",value:()=>`${document.documentElement.clientWidth}px`}];function a(){const t=r.reduce(((t,e)=>t+`--${e.name}:${e.value()};`),"");n.textContent=`:root{${t}}`}a(),s.insertBefore(n,s.querySelector("style, link")),window.addEventListener("resize",a)},771:function(t,e,i){"use strict";i.d(e,{Z:function(){return h}});i(3948);var s=i(3396),n=i(7139);function r(t,e,i,r,a,o){return(0,s.wg)(),(0,s.iD)("div",{class:(0,n.C_)(["loader-points-line",{active:a.isActive}])},[(0,s._)("div",{class:(0,n.C_)(["loader-points-line__point",[i.classPoint]]),onAnimationiteration:e[0]||(e[0]=(...t)=>o.animationiteration&&o.animationiteration(...t))},null,34),(0,s._)("div",{class:(0,n.C_)(["loader-points-line__point",[i.classPoint]])},null,2),(0,s._)("div",{class:(0,n.C_)(["loader-points-line__point",[i.classPoint]])},null,2)],2)}var a={name:"LoaderPointsLine",props:{play:{type:Boolean,required:!0},classPoint:{type:String,default:""}},data(){return{isActive:!1,timeLastIteration:Date.now(),animationDuration:1500,animationTimeout:300}},methods:{animationiteration(){const t=Math.abs(Date.now()-this.timeLastIteration-this.animationDuration);this.setTimeLastIteration(),!this.play&&t<=this.animationTimeout&&(this.$emit("animation-end"),this.isActive=!1)},setTimeLastIteration(){this.timeLastIteration=Date.now()}},mounted(){this.isActive=this.play,this.setTimeLastIteration()},watch:{play(t){t&&(this.isActive=!0,this.setTimeLastIteration())}}},o=i(89);const c=(0,o.Z)(a,[["render",r]]);var h=c}},e={};function i(s){var n=e[s];if(void 0!==n)return n.exports;var r=e[s]={exports:{}};return t[s](r,r.exports,i),r.exports}i.m=t,function(){var t=[];i.O=function(e,s,n,r){if(!s){var a=1/0;for(d=0;d<t.length;d++){s=t[d][0],n=t[d][1],r=t[d][2];for(var o=!0,c=0;c<s.length;c++)(!1&r||a>=r)&&Object.keys(i.O).every((function(t){return i.O[t](s[c])}))?s.splice(c--,1):(o=!1,r<a&&(a=r));if(o){t.splice(d--,1);var h=n();void 0!==h&&(e=h)}}return e}r=r||0;for(var d=t.length;d>0&&t[d-1][2]>r;d--)t[d]=t[d-1];t[d]=[s,n,r]}}(),function(){i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,{a:e}),e}}(),function(){i.d=function(t,e){for(var s in e)i.o(e,s)&&!i.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})}}(),function(){i.f={},i.e=function(t){return Promise.all(Object.keys(i.f).reduce((function(e,s){return i.f[s](t,e),e}),[]))}}(),function(){i.u=function(t){return"js/"+t+".23948130.js"}}(),function(){i.miniCssF=function(t){return"css/"+t+".00c814ea.css"}}(),function(){i.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={},e="weather:";i.l=function(s,n,r,a){if(t[s])t[s].push(n);else{var o,c;if(void 0!==r)for(var h=document.getElementsByTagName("script"),d=0;d<h.length;d++){var l=h[d];if(l.getAttribute("src")==s||l.getAttribute("data-webpack")==e+r){o=l;break}}o||(c=!0,o=document.createElement("script"),o.charset="utf-8",o.timeout=120,i.nc&&o.setAttribute("nonce",i.nc),o.setAttribute("data-webpack",e+r),o.src=s),t[s]=[n];var u=function(e,i){o.onerror=o.onload=null,clearTimeout(m);var n=t[s];if(delete t[s],o.parentNode&&o.parentNode.removeChild(o),n&&n.forEach((function(t){return t(i)})),e)return e(i)},m=setTimeout(u.bind(null,void 0,{type:"timeout",target:o}),12e4);o.onerror=u.bind(null,o.onerror),o.onload=u.bind(null,o.onload),c&&document.head.appendChild(o)}}}(),function(){i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){i.p="/weather/"}(),function(){var t=function(t,e,i,s){var n=document.createElement("link");n.rel="stylesheet",n.type="text/css";var r=function(r){if(n.onerror=n.onload=null,"load"===r.type)i();else{var a=r&&("load"===r.type?"missing":r.type),o=r&&r.target&&r.target.href||e,c=new Error("Loading CSS chunk "+t+" failed.\n("+o+")");c.code="CSS_CHUNK_LOAD_FAILED",c.type=a,c.request=o,n.parentNode.removeChild(n),s(c)}};return n.onerror=n.onload=r,n.href=e,document.head.appendChild(n),n},e=function(t,e){for(var i=document.getElementsByTagName("link"),s=0;s<i.length;s++){var n=i[s],r=n.getAttribute("data-href")||n.getAttribute("href");if("stylesheet"===n.rel&&(r===t||r===e))return n}var a=document.getElementsByTagName("style");for(s=0;s<a.length;s++){n=a[s],r=n.getAttribute("data-href");if(r===t||r===e)return n}},s=function(s){return new Promise((function(n,r){var a=i.miniCssF(s),o=i.p+a;if(e(a,o))return n();t(s,o,n,r)}))},n={143:0};i.f.miniCss=function(t,e){var i={234:1};n[t]?e.push(n[t]):0!==n[t]&&i[t]&&e.push(n[t]=s(t).then((function(){n[t]=0}),(function(e){throw delete n[t],e})))}}(),function(){var t={143:0};i.f.j=function(e,s){var n=i.o(t,e)?t[e]:void 0;if(0!==n)if(n)s.push(n[2]);else{var r=new Promise((function(i,s){n=t[e]=[i,s]}));s.push(n[2]=r);var a=i.p+i.u(e),o=new Error,c=function(s){if(i.o(t,e)&&(n=t[e],0!==n&&(t[e]=void 0),n)){var r=s&&("load"===s.type?"missing":s.type),a=s&&s.target&&s.target.src;o.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",o.name="ChunkLoadError",o.type=r,o.request=a,n[1](o)}};i.l(a,c,"chunk-"+e,e)}},i.O.j=function(e){return 0===t[e]};var e=function(e,s){var n,r,a=s[0],o=s[1],c=s[2],h=0;if(a.some((function(e){return 0!==t[e]}))){for(n in o)i.o(o,n)&&(i.m[n]=o[n]);if(c)var d=c(i)}for(e&&e(s);h<a.length;h++)r=a[h],i.o(t,r)&&t[r]&&t[r][0](),t[r]=0;return i.O(d)},s=self["webpackChunkweather"]=self["webpackChunkweather"]||[];s.forEach(e.bind(null,0)),s.push=e.bind(null,s.push.bind(s))}();var s=i.O(void 0,[998],(function(){return i(134)}));s=i.O(s)})();
//# sourceMappingURL=app.41dfcad7.js.map