"use client";

import dynamic from "next/dynamic";

const RiskGraph3D = dynamic(() => import("./RiskGraph3D"), { ssr: false });

export default function RiskGraph3DClient() {
  return <RiskGraph3D />;
}
