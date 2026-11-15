/** Resolve bundled public files under the deployment directory (including GitHub Pages). */
export function assetUrl(path:string,base=import.meta.env.BASE_URL):string{
 if(/^(?:https?:)?\/\//.test(path))return path;
 return `${base.replace(/\/$/,'')}/${path.replace(/^\//,'')}`;
}
