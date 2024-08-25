import React from "react";

type Props = {};

export default function KrittiersPage({}: Props) {
  return (
    <div>
      <div>Juntos podemos transformar vidas</div>
      <div>
        <div>Conoce a los Krittiers</div>
        <img
          style={{
            display: "flex",
            fontSize: 75,
            borderRadius: 100,
          }}
          src="./packages/nextjs/public/00b81dafe9634dd8ac6af07c82a8f144.png"
          alt=""
        />
        <img src="./packages/nextjs/public/7c097d8a0c9f9026357ebf5de7e13984.png" alt="" />
        <img src="./packages/nextjs/public/dcc03a450d527d11123cf7f1f1a8e5ad.png" alt="" />
      </div>
      <div>
        <button>Conoce a los Krittiers</button>
      </div>
    </div>
  );
}
