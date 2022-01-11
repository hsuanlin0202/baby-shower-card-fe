import { BaseLayout } from "components/layout";

const VendorIndexPage = (): JSX.Element => {
  return (
    <BaseLayout title="廠商管理介面">
      <header className="w-full h-10 leading-10 bg-gray-700 text-white">
        這裡放是Header，可以放廠商Logo、名稱等等
      </header>
      <div className="flex h-screen -mt-10 pt-10">
        <nav className="w-1/5 h-full bg-gray-200">這裡是選單</nav>
        <main className="w-4/5 h-full">這裡是內容</main>
      </div>
    </BaseLayout>
  );
};
export default VendorIndexPage;
