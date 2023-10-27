import {  get } from "@vercel/edge-config";

async function middleware() {
  const greeting = await get("greeting");
  return greeting;
  // return NextResponse.json(
  //   { message: "Hello from middleware!" },
  //   { status: 200 }
  // );
}

async function About() {
  let a: any;
  a = await middleware();
  console.log("-------------------");
  console.log(new Date());
  console.log(a);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex border border-indigo-600 h-8 hover:h-full">
        About  {a?.toString()}
      </div>
    </main>
  );
}

export default About;
