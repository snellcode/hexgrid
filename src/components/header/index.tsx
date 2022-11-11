import { h } from "preact";
import { Link } from "preact-router/match";

export const AppHeader = () => (
  <header class="app-header">
    <div class="container">
      <h1>
        <Link activeClassName="active" href="/">
          hexgrid
        </Link>
      </h1>
      <nav>
        <Link activeClassName="active" href="/about">
          About
        </Link>
      </nav>
    </div>
  </header>
);
