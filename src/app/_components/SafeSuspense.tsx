import { ErrorBoundary } from "react-error-boundary";
import { Suspense, type ReactNode } from "react";

interface SafeSuspenseProps {
  children: ReactNode;
}

export default function SafeSuspense({ children }: SafeSuspenseProps) {
  return (
    <ErrorBoundary
      fallback={<div>エラーが発生しました。ページをリロードしてください。</div>}
    >
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </ErrorBoundary>
  );
}
