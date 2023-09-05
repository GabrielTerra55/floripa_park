import { Provider } from "react-redux";
import Router from "./routes/Router";
import { store } from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}
