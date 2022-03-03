import { BackButton, Button } from "components/pages/baby/Buttons";

function Card({ title, content }) {
  return (
    <div className="w-full bg-brown-600 rounded-lg p-4">
      <h2 className="text-base font-bold pb-2">{title}</h2>
      <p className="text-base">{content}</p>
    </div>
  );
}

function List({ children }) {
  return (
    <ul className="w-full flex flex-col gap-4 max-h-[73vh] overflow-auto">
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

        <section className="flex flex-col px-4">
          <header className="mb-4 px-4">
            <h1 className="text-2xl">熊熊，祝福你...</h1>
            <p className="text-sm">
              來自親朋好友溫暖的祝福，希望熊熊能開心長大...
            </p>
          </header>

          <List>
            <Card
              title="安安阿姨"
              content="熊熊，很可愛喔！謝謝彌月禮盒！好吃！"
            />
            <Card
              title="熊熊阿公"
              content="熊熊，要聽爸爸媽媽的話喔！等過年阿公再給你好多紅包！"
            />
            <Card
              title="志祥叔叔"
              content="熊熊，要乖乖長大！希望你可以天天開心喔！"
            />
            <Card
              title="Amy Chen"
              content="謝謝禮盒～等疫情過後再帶熊熊一起出去走走吧！"
            />
            <Card
              title="安安阿姨"
              content="熊熊，很可愛喔！謝謝彌月禮盒！好吃！"
            />
            <Card
              title="蝴蝶姊姊"
              content="熊熊，要乖乖長大！希望你可以天天開心喔！"
            />
            <Card
              title="熊熊阿嬤"
              content="熊熊，要聽爸爸媽媽的話喔！等過年阿公再給你好多紅包！"
            />
          </List>

          <footer className="mx-auto mt-5 mx-auto">
            <Button value="我想祝福" className="bg-brown-500 " />
          </footer>
        </section>
      </div>
    </>
  );
}
