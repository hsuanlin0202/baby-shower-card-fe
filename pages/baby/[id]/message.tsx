import { BackButton, Button } from "components/pages/baby/Buttons";

function Card({ maintitle, description, content }) {
  return (
    <div className="w-full bg-brown-600 rounded-lg p-4 text-center">
      <h1 className="text-2xl mt-8 mb-5">{maintitle}</h1>
      <p className="text-sm px-16 mb-5">{description}</p>
      <p className="text-sm">{content}</p>
    </div>
  );
}

function List({ children }) {
  return (
    <ul className="w-full flex flex-col gap-4 max-h-[70vh] overflow-auto">
      {children}
    </ul>
  );
}

export default function CommentPage() {
  return (
    <>
      <style jsx>
        {`
          .card-background-image {
            background-image: url("/bg.png");
            background-position: center;
            background-size: contain;
          }
        `}
      </style>

      <div className="w-screen h-screen card-background-image text-brown-500">
        <nav className="p-5 pl-5">
          <BackButton />
        </nav>

        <section className="flex flex-col">
          <List>
            <Card
              maintitle="熊熊，祝福你..."
              description="跟熊熊還有爸爸媽媽說說你最真摯的祝福吧！最多50個字喔..."
              content="熊熊，很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔很可愛喔！謝謝彌月禮盒！好吃！很可愛喔！謝謝彌月禮盒！好吃！，很可愛喔！謝謝彌月禮盒！好吃！，很可愛喔！謝謝彌月禮盒！好吃！，很可愛喔！謝謝彌月禮盒！好吃！，很可愛喔！謝謝彌月禮盒！好吃！，很可愛喔！謝謝彌月禮盒！好吃！，很可愛喔！謝謝彌月禮盒！好吃！，很可愛喔！謝謝彌月禮盒！好吃！，很可愛喔！謝謝彌月禮盒！好吃！，很可愛喔！謝謝彌月禮盒！好吃！，很可愛喔！謝謝彌月禮盒！好吃！，很可愛喔！謝謝彌月禮盒！好吃！，很可愛喔！謝謝彌月禮盒！好吃！，很可愛喔！謝謝彌月禮盒！好吃！，很可愛喔！謝謝彌月禮盒！好吃！，很可愛喔！謝謝彌月禮盒！好吃！，很可愛喔！謝謝彌月禮盒！好吃！，很可愛喔！謝謝彌月禮盒！好吃！，很可愛喔！謝謝彌月禮盒！好吃！，很可愛喔！謝謝彌月禮盒！好吃！，很可愛喔！謝謝彌月禮盒！好吃！，很可愛喔！謝謝彌月禮盒！好吃！，很可愛喔！謝謝彌月禮盒！好吃！，很可愛喔！謝謝彌月禮盒！好吃！"
            />
          </List>

          <footer className="mx-auto mt-5">
            我是
            <Button
              value="最多8個字喔：）"
              className="text-brown-700 px-20 bg-brown-100 border-2 border-brown-500 mb-5 ml-4"
            />
            <br />
            <div className="grid gap-4 grid-cols-2">
              <Button
                value="返回"
                className="bg-white text-brown-500 border-2 border-brown-500 "
              />
              <Button value="送出祝福" className="bg-brown-500 " />
            </div>
          </footer>
        </section>
      </div>
    </>
  );
}
