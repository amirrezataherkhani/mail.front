import "@fake-db";
import React from "react";
import { FuseAuthorization, FuseLayout, FuseTheme } from "@fuse";
import Provider from "react-redux/es/components/Provider";
import { Router } from "react-router-dom";
import jssExtend from "jss-extend";
import history from "@history";
import { Auth } from "./auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./store";
import AppContext from "./AppContext";
import routes from "./fuse-configs/routesConfig";
import { create } from "jss";
import {
  StylesProvider,
  jssPreset,
  createGenerateClassName,
} from "@material-ui/styles";
import { QueryClient, QueryClientProvider } from "react-query";

const jss = create({
  ...jssPreset(),
  plugins: [...jssPreset().plugins, jssExtend()],
  insertionPoint: document.getElementById("jss-insertion-point"),
});

const generateClassName = createGenerateClassName();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      cacheTime: 0,
      staleTime: 0,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppContext.Provider
          value={{
            routes,
          }}
        >
          <StylesProvider jss={jss} generateClassName={generateClassName}>
            <ToastContainer
              autoClose={3000}
              newestOnTop
              closeOnClick
              rtl={true}
              pauseOnFocusLoss={false}
              draggable
              pauseOnHover
            />
            <Provider store={store}>
              <Auth>
                <Router history={history}>
                  <FuseAuthorization>
                    <FuseTheme>
                      <FuseLayout />
                    </FuseTheme>
                  </FuseAuthorization>
                </Router>
              </Auth>
            </Provider>
          </StylesProvider>
        </AppContext.Provider>
      </QueryClientProvider>
    </>
  );
};

export default App;
