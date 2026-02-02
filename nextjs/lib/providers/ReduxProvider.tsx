"use client";

import { Provider } from "react-redux";
import store, { persistor } from "../../stores/store";
import { PersistGate } from "redux-persist/integration/react";
// import LoaderPage from "@/components/common/LoaderPage";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  );
}
