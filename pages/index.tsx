import Head from "next/head";

export default function Home() {
  return (
    <div className="w-full">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="border rounded bg-gray-400 text-xl text-pink-600 font-bold">
          OK... second try!
        </h1>

        <p>To be honest I don't really know what I am doing. :P</p>
      </main>

      <footer className=" text-red-500">
        But, whatever, nice to have the first step. ;-D
      </footer>
    </div>
  );
}
