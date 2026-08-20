/* Los .svg importados desde TS/TSX son componentes React (ver SVGR en next.config.ts).
   Sin esto TypeScript los trata como modulos sin tipo. */
declare module "*.svg" {
  import type { FC, SVGProps } from "react";
  const ReactComponent: FC<SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
