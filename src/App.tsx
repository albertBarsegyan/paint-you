import { Suspense } from "react";

import { CanvasBlockLayout } from "./components/layout/canvas-block-layout";
import { MainLayout } from "./components/layout/main-layout";
import { Loader } from "./components/loader";

function App() {
  return (
    <MainLayout>
      <Suspense fallback={<Loader />}>
        <CanvasBlockLayout />
      </Suspense>
    </MainLayout>
  );
}

export default App;
