import dynamic from "next/dynamic";
import Head from "next/head";

const CanvasEditor = dynamic(() => import("../components/CanvasEditor"), { ssr: false });

export default function Home() {
  return (
    <>
      <Head>
        <title>Diamondlabels Editor</title>
      </Head>
      <CanvasEditor />
    </>
  );
}