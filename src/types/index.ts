export type Location = {lat:number;lon:number};
export type Grid = {width:number;height:number;west:number;north:number;step:number;noData:number;data:Int16Array|Float32Array;asset?:string;sourceUrl?:string};
export type Site = Location & {id:string;name:string;mission:string;sourceUrl:string;relevance?:string;uncertainty?:string;imageUrl?:string};
export type ScientificMetadata = {id?:string;sourceName:string;agency:string;mission?:string;instrument?:string;productName?:string;sourceUrl:string;downloadUrl?:string;observationPeriod?:string;resolution?:string;units:string;category:'observed'|'derived'|'simulated';processingMethod?:string;limitations?:string[];licenseOrUsageTerms?:string;status?:string};
