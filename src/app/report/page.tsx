import { Suspense } from "react";
import Report from "@/Components/Report/Report";

export default function ReportPage() {
  return (
    <Suspense fallback={null}>
      <Report />
    </Suspense>
  );
}
