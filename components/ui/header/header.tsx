import Image from "next/image";
import { ModeToggle } from "../mode-toggle/mode-toggle";
import Link from "next/link";
import UserInfo from "../user-info/user-info";
import { Button } from "../button/button";

export default function Header() {
  return (
    <header className="z-10 absolute flex w-full items-center justify-between p-5 bg-transparent">
      <Link href={"/"} className="flex items-center gap-3">
        <Image
          width={50}
          height={50}
          src={"/VikFitAi.png"}
          alt="Meal Planner Logo"
          priority
          className="rounded-full"
        />
      </Link>

      <div className="flex gap-3 items-center">
        <Link href={"/meal-plans"} className="text-sm">
          <Button variant='outline' color="black">My Plans</Button>
        </Link>
        <ModeToggle />
        <UserInfo />
      </div>
    </header>
  );
}
