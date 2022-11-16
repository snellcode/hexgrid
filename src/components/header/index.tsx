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

      <div class="menu">
        <nav role="navigation">
          <ul>
            <li>
              Menu
              <ul class="dropdown">
                <li>
                  <Link activeClassName="active" href="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link activeClassName="active" href="/css-vertical">
                    CSS (Vertical)
                  </Link>
                </li>
                <li>
                  <Link activeClassName="active" href="/css-horizontal">
                    CSS (Horizontal)
                  </Link>
                </li>
                <li>
                  <Link activeClassName="active" href="/phaser-rex">
                    Phaser (Rex Plugin)
                  </Link>
                </li>
                <li>
                  <Link activeClassName="active" href="/about">
                    About
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
);
