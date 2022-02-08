export default function () {
  return (
    <html className="bg-yellow-50">
      <div className="card bg-white w-1/3">
        <div className="photo">
          <img src="" alt="logo" />
          <img src="https://fakeimg.pl/330x330/" alt="baby" />
        </div>
        <div className="text text-center text-red-1000">
          <div className="babyName">
            <p>熊熊，滿月囉！</p>
          </div>
          <div className="story">
            <p>謝謝各位 親朋好友的祝福：） 與您分享 這份幸福的喜悅</p>
          </div>
          <div className="parents">
            <div className="papa">
              爸爸
              <p>雄大名</p>
            </div>
            <div className="mama">
              媽媽
              <p>謝小花</p>
            </div>
          </div>
          <div className="date"></div>
        </div>
        <input
          className="bg-red-1000 text-white text-sm w-32 h-8 rounded-md"
          type="button"
          value="保存回憶"
        />
        <div className="icon flex flex-row">
          <div className="item like">[like]</div>
          <div className="item comment">[comment]</div>
          <div className="item shares">[share]</div>
        </div>
        <a
          href="#"
          className="text-xs underline underline-offset-1 text-red-1000"
        >
          彌月禮盒滿意度調查
        </a>
        <div className="text-sm bg-red-100">Created by BABY SHOWER.com</div>
      </div>
    </html>
  );
}
