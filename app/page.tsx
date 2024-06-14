"use client";
import { Suspense } from "react";

const HomePage = () => {
  return (
    <div className="h-full p-4">
      <h1 className="text-3xl">User OpenAPI</h1>
      <p>Coming soon</p>
    </div>
  );
};

export default function SuspensedHomepage() {
  // Needed for https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
  return (
    <Suspense>
      <HomePage />
    </Suspense>
  );
}
