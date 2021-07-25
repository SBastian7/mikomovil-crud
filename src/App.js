import { BrowserRouter, Link, Route } from "react-router-dom";
import EditScreen from "./screens/EditScreen";
import UsersScreen from "./screens/UsersScreen";

function App() {
  

  return (
    <BrowserRouter>
      <div className="">

        {/* Navigation */}
        <nav className="no-shadow">
          <div className="nav-wrapper ">
            <div className="row"></div>
            <div className="row">
              <div className="linea">
                <Link to="#!" className="col ml-0">
                  <img src="/logo.png" className="logo" alt="" />
                </Link>
                <div className="col hide-on-small-only">
                  <div className="btn-flat btn-n ">
                    <div className="btn-nav-txt cap">
                      Pólizas
                    </div>
                  </div>
                </div>
                <div className="col hide-on-small-only">
                  <div className="btn-flat btn-n btn-active valign-wrapper">
                    <Link to="/crm" className="btn-nav-txt">
                      <div className="jm">
                        CRM
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="col hide-on-small-only">
                  <div className="btn-flat btn-n">
                    <div className="btn-nav-txt cap">Archivos</div>
                  </div>
                </div>
                <div className="col hide-on-small-only">
                  <div className="btn-flat btn-n">
                    <div className="btn-nav-txt cap">Cartera</div>
                  </div>
                </div>
                <div className="col right p-0">
                  <img src="/user.jpeg" className="user-img" alt="" />
                </div>
                <div className="col right m hide-on-small-only">
                  <span className="material-icons-outlined bell">
                    notifications
                  </span>
                </div>
              </div>
            </div>
          </div>
        </nav>

      </div>
      <main>
        <Route path="/crm/new_client" component={EditScreen} exact></Route>
        <Route path="/crm" component={UsersScreen} exact></Route>
      </main>
      <footer className="">
        <div className="footer-copyright page-footer2">
          <div className="container">
            <div className="row">
              <div className="valign-wrapper">
                <p className="text-center col s12 grey-text text-darken-3">© 2021 / Sebastián Molina</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </BrowserRouter>
  );
}

export default App;
