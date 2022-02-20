import ArrowIcon from "../../../assets/svg/arrow.svg";

function Navbar() {
  return (
    <nav className="p-4 text-brown-500">
      <button
        onClick={function a() {
          console.log("a");
        }}
      >
        <ArrowIcon /> Back
      </button>
    </nav>
  );
}

function List() {
  return (
    <ul>
      <li></li>
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

      <div className="card-background-image">
        <Navbar />

        <section>
          <header>
            <h1></h1>
            <p></p>
          </header>

          <List />

          <footer>
            <input type="button" />
          </footer>
        </section>
      </div>
    </>
  );
}
