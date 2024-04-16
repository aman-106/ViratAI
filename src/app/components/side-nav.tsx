import Link from "next/link";

import ChatHistory from "./chat-history";
import AppLogo from "./app-logo";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 shadow-sm md:px-2">
      {/* <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href="/chat"
      >
        <div className="w-32 text-white md:w-40">
          <AppLogo />
        </div>
      </Link> */}
      <div className="flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
          <AppLogo withText={false}/>
        </div>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <ChatHistory />
      </div>
    </div>
  );
}
