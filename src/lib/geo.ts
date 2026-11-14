import type {Grid,Location} from '../types';
export const MARS_RADIUS_KM=3389.5;
const rad=Math.PI/180;
export function normalizeLon(lon:number){return ((lon+180)%360+360)%360-180}
export function validLocation(p:Location){return Number.isFinite(p.lat)&&Number.isFinite(p.lon)&&Math.abs(p.lat)<=90}
// Three SphereGeometry UVs: west (-180) at u=0, north at v=1.
export function toVector(p:Location,r=1):[number,number,number]{
 if(!validLocation(p))throw new Error('Invalid planetocentric coordinates');
 const a=p.lat*rad,b=p.lon*rad;return [r*Math.cos(a)*Math.cos(b),r*Math.sin(a),-r*Math.cos(a)*Math.sin(b)];
}
export function fromVector(v:readonly number[]):Location{const r=Math.hypot(...v);if(!r)throw new Error('Zero vector');return {lat:Math.asin(Math.max(-1,Math.min(1,v[1]/r)))/rad,lon:normalizeLon(Math.atan2(-v[2],v[0])/rad)}}
export function distanceKm(a:Location,b:Location){if(!validLocation(a)||!validLocation(b))throw new Error('Invalid coordinates');const dlat=(b.lat-a.lat)*rad,dlon=(b.lon-a.lon)*rad;const h=Math.sin(dlat/2)**2+Math.cos(a.lat*rad)*Math.cos(b.lat*rad)*Math.sin(dlon/2)**2;return 2*MARS_RADIUS_KM*Math.asin(Math.sqrt(Math.min(1,Math.max(0,h))))}
export function geodesic(a:Location,b:Location,segments=64):Location[]{
 const u=toVector(a),v=toVector(b),dot=Math.max(-1,Math.min(1,u.reduce((s,x,i)=>s+x*v[i],0))),angle=Math.acos(dot);
 if(angle<1e-8)return Array.from({length:segments+1},()=>({...a}));
 let tangent=v.map((x,i)=>x-dot*u[i]);let n=Math.hypot(...tangent);
 if(n<1e-8){const axis=Math.abs(u[1])<.9?[0,1,0]:[1,0,0];const d=axis.reduce((s,x,i)=>s+x*u[i],0);tangent=axis.map((x,i)=>x-d*u[i]);n=Math.hypot(...tangent)}
 return Array.from({length:segments+1},(_,i)=>i===0?a:i===segments?b:fromVector(u.map((x,j)=>x*Math.cos(angle*i/segments)+tangent[j]/n*Math.sin(angle*i/segments))));
}
export function sampleGrid(grid:Grid|null,p:Location):number|null{
 if(!grid||!validLocation(p))return null;
 const {width:w,height:h,step,west,north,data,noData}=grid;
 const y=(north-p.lat)/step-.5;
 if(p.lat>north||p.lat<north-h*step)return null;
 const x=(((p.lon-west)%360)+360)%360/step-.5;
 const x0=Math.floor(x),y0=Math.max(0,Math.min(h-1,Math.floor(y))),y1=Math.max(0,Math.min(h-1,Math.ceil(y)));
 const tx=x-x0,ty=Math.max(0,Math.min(1,y-y0));
 const samples=[[x0,y0,(1-tx)*(1-ty)],[x0+1,y0,tx*(1-ty)],[x0,y1,(1-tx)*ty],[x0+1,y1,tx*ty]];
 let value=0;
 for(const [col,row,weight] of samples){if(weight<=1e-12)continue;const v=data[row*w+((col%w)+w)%w];if(v===noData||!Number.isFinite(v))return null;value+=v*weight}
 return value;
}
export function slopeDegrees(grid:Grid|null,p:Location){
 if(!grid||Math.abs(p.lat)>90-grid.step)return null;
 const d=grid.step,points=[{lat:p.lat,lon:p.lon-d},{lat:p.lat,lon:p.lon+d},{lat:p.lat-d,lon:p.lon},{lat:p.lat+d,lon:p.lon}],v=points.map(q=>sampleGrid(grid,q));
 if(v.some(x=>x===null))return null;
 const dx=distanceKm(points[0],points[1])*1000,dy=distanceKm(points[2],points[3])*1000;
 if(dx<1e-6||dy<1e-6)return null;
 return Math.atan(Math.hypot((v[1]!-v[0]!)/dx,(v[3]!-v[2]!)/dy))/rad;
}
