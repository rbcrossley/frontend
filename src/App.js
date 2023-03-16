import Second from "./Second.js";
import Firstpage from "./First.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import Myroutes from "./Myroutes.js";
import './mystyle.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { GlobalContextProvider } from "./hooks/GlobalContext.js";
// import myStore from "./redux/store"
import { Provider } from "react-redux";
import { myStore } from "./components/reducers/store.js";

function App() {
  return (
    <>
      <GlobalContextProvider>
        <Provider store={myStore}>
          <Myroutes />
        </Provider>
      </GlobalContextProvider>


    </>
  );
}

export default App;
