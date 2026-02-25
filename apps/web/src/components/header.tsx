import { Link } from "@tanstack/react-router";
import { Authenticated, Unauthenticated } from "convex/react";

import UserMenu from "./user-menu";
import { ModeToggle } from "./mode-toggle";

export default function Header() {
  return (
    <div>
      <div className="flex flex-row items-center justify-between px-2 py-1">
        <nav className="flex gap-4 text-lg">
          <Link to="/">Home</Link>
          <Authenticated>
            <Link to="/dashboard">Dashboard</Link>
          </Authenticated>
        </nav>
        <div className="flex items-center gap-2">
          <Authenticated>
            <UserMenu />
          </Authenticated>
          <Unauthenticated>
            <Link to="/sign-in">Login</Link>
          </Unauthenticated>
          <ModeToggle />
        </div>
      </div>
      <hr />
    </div>
  );
}
