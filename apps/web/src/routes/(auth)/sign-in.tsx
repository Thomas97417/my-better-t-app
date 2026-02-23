import { createFileRoute } from "@tanstack/react-router";
import SignInForm from "@/components/sign-in-form";
import { useState } from "react";
import SignUpForm from "@/components/sign-up-form";

export const Route = createFileRoute("/(auth)/sign-in")({
  component: RouteComponent,
});

function RouteComponent() {
  const [showSignUp, setShowSignUp] = useState(false);
  return (
    <>
      {showSignUp ? (
        <SignUpForm onSwitchToSignIn={() => setShowSignUp(false)} />
      ) : (
        <SignInForm onSwitchToSignUp={() => setShowSignUp(true)} />
      )}
    </>
  );
}
