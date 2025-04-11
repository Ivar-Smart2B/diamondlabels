import dynamic from "next/dynamic";
import Head from "next/head";

const Editor = dynamic(() => import("../components/Editor"), { ssr: false });

export default function Home() {
  return (
    <>
      <Head>
        <title>Diamondlabels Label Editor</title>
      </Head>
      <Editor />
    </>
  );
}