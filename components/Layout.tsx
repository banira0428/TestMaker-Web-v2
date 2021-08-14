import Head from "next/head";
import { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Advertisement from "./Advertisement";

// 全画面に共通する外枠部分（ヘッダとフッタ）
export default class Layout extends Component {
  render() {
    return (
      <div className="flex flex-col min-h-screen">
        <Header/>
        <div className="flex-grow w-full">
          {this.props.children}
        </div>
        <Advertisement/>
        <Footer/>
      </div>)
  }
}
