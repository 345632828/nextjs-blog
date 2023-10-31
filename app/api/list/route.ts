import { NextResponse } from "next/server";
export const GET = (req: Request) => {
  return NextResponse.json({ message: "greeting", status: 200, errMsg: "" });
};

export const POST = (req: Request, res: Response) => {
  return NextResponse.json({ message: "greeting", status: 200, errMsg: "" });
};
