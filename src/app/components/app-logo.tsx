import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function AppLogo({ withText = true }: { withText?: boolean }) {
  return (
    <div className={`flex flex-row items-center leading-none text-white`}>
      <Link href={"/chat"}>
        <ChatBubbleLeftEllipsisIcon className="h-12 w-12 rotate-[15deg] transition duration-300 hover:transform hover:rotate-0" />
      </Link>

      {withText && <p className="text-[44px]">AI Chat App</p>}
    </div>
  );
}

