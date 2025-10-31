import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import logo from "/logo.png";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const routerState = useRouterState();

  const currentPath = routerState.location.pathname;

  
  const isActive = (path: string) =>
    currentPath === path
      ? "active text-primary fw-semibold border-bottom border-primary"
      : "text-dark";

  //Global search handler
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate({ to: "/", search: { q: search } });
    setSearch("");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top shadow-sm py-2">
      <div className="container">
        {/* Logo */}
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center gap-2 fw-semibold text-primary"
          style={{ fontSize: "1.3rem" }}
        >
          <img src={logo} alt="Revivar logo" height={42} style={{ width: "auto" }} />
          Revivar Cards
        </Link>

        {/*  Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/*  Nav links + search */}
        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className={`nav-link fw-medium ${isActive("/")}`}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/card" className={`nav-link fw-medium ${isActive("/card")}`}>
                Design Card
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/personalization"
                className={`nav-link fw-medium ${isActive("/personalization")}`}
              >
                Gallery
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/search" className={`nav-link fw-medium ${isActive("/search")}`}>
                About
              </Link>
            </li>
          </ul>

          {/* 🔍 Global Search */}
          <form className="d-flex align-items-center" role="search" onSubmit={handleSearch}>
            <div className="input-group">
              <input
                className="form-control rounded-start-pill"
                type="search"
                placeholder="Search images..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  border: "1px solid #dee2e6",
                  boxShadow: "none",
                }}
              />
              <button className="btn btn-primary rounded-end-pill px-3" type="submit">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
}
