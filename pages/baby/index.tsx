export default function () {
  return (
    // size; color; position
    <html className="flex h-screen bg-brown-50 items-center justify-center ">
      <div className="card w-50 bg-brown-100">
        <div className="photo w-5/6 flex flex-col mx-auto">
          <img src="https://fakeimg.pl/110x60/" alt="logo" />
          <img src="https://fakeimg.pl/330x330/" alt="babyPhoto330x330" />
        </div>
        <div className="text text-brown-500 text-center my-4">
          <div className="babyName text-xl">
            <p>
              <span>熊熊</span> ，滿月囉！
            </p>
          </div>
          <div className="story max-w-60p mx-auto leading-relaxed">
            <p>謝謝各位 親朋好友們的祝福：） 與您分享 這份幸福的喜悅</p>
          </div>
          <div className="parents">
            <div className="papa text-xl">
              <p>
                爸爸<span>雄大名</span>
              </p>
            </div>
            ＆
            <div className="mama text-xl">
              <p>
                媽媽<span>謝小花</span>
              </p>
            </div>
          </div>
          <div className="date"></div>
        </div>
        <form className="flex">
          <input
            className="h-8 w-32 bg-brown-500 text-sm text-white rounded-md mx-auto"
            type="button"
            value="保存回憶"
          />
        </form>
        <div className="icon flex gap-4 columns-3 text-center my-12">
          <div className="w-full">
            <i></i>[like]
          </div>
          <div className="w-full">
            <i></i>[comment]
          </div>
          <div className="w-full">
            <i></i>[share]
          </div>
        </div>
        <a href="#">
          <p className="mt-8 mb-4 text-xs text-brown-500 underline underline-offset-1 text-center">
            彌月禮盒滿意度調查
          </p>
        </a>
        <div className="py-3 bg-brown-200 text-xs text-brown-500 text-center">
          <p>Created by BABY SHOWER.com</p>
        </div>
      </div>
    </html>
  );
}
