import React from "react";
import AntdContainer from "@/components/antdContainer";

function adminLayout({
    children,
  }: {
    children: React.ReactNode
  }){
  return <AntdContainer>{children}</AntdContainer>
}

export default adminLayout