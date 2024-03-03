import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import Link from "next/link";
export default async function Cart({
  params,
}: {
  params: { id: string };
}): Promise<JSX.Element> {
  console.log(params);
  let { rows } = await sql`SELECT * FROM TodoList WHERE id = ${params.id}`;
  if (Number(params.id) > 2) {
    let sq = {
      userId: "userId" + Math.floor(Math.random() * 101),
      content: Math.floor(Math.random() * 101),
    };
    sql`INSERT INTO TodoList (content, userId) VALUES (${sq.userId}, ${sq.content})`;
   
  }
  // console.log('rows')
  // console.log(rows)

  return (
    <main className="flex min-h-screen flex-col items-center ">
      <Link
        className="text-sm lg:flex border border-indigo-600 h-16 items-center"
        href={{ pathname: "/about/1", query: {} }}
      >
        查看数据表id=1的数据
      </Link>
      <Link
        className="text-sm lg:flex border border-indigo-600 h-16 items-center"
        href={{ pathname: "/about/2", query: {} }}
      >
        查看数据表id=2的数据
      </Link>
      {rows.map((row) => (
        <div key={row.id}>
          {row.id} - {row.content}
        </div>
      ))}
    </main>
  );
}


