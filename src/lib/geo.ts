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
