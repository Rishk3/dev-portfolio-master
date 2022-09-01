import React, { useState, useEffect, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import FallbackSpinner from "./components/FallbackSpinner";
import NavBarWithRouter from "./components/NavBar";
import Home from "./components/Home";
import Pmo from "./components/Pmo";
// import Projects from "./components/Projects";

import endpoints from "./constants/endpoints";

function MainApp() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.routes, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <div className="MainApp">
      <NavBarWithRouter />
      <main className="main">
        <Switch>
          <Suspense fallback={<FallbackSpinner />}>
            <Route exact path="/" component={Home} />
            <Route exact path="/projects" component={Pmo} />
            {data &&
              data.sections.map((route) => {
                const SectionComponent = React.lazy(() =>
                  import("./components/" + route.component)
                );

                if (route?.path !== "/projects")
                  return (
                    <Route
                      key={route.headerTitle}
                      path={route.path}
                      component={() => (
                        <SectionComponent header={route.headerTitle} />
                      )}
                    />
                  );
              })}
          </Suspense>
        </Switch>
      </main>
    </div>
  );
}

export default MainApp;
