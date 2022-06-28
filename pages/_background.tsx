import { ReactElement } from "react";
// import type { AppProps } from "next/app";

function Background({ children }: { children: ReactElement }) {
  return <div className={"background"}>{children}</div>;
}

export default Background;
