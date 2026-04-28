import { Suspense } from "react";
import TestDashboard from "@/Components/TestDashboard/TestDashboard";

export default function TestPage() {
  return (
    <Suspense fallback={null}>
      <TestDashboard />
    </Suspense>
  );
}
