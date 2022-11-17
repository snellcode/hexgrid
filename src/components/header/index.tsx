import { h } from "preact";
import { Link } from "preact-router/match";

const links = [
  ["CSS (Vertical)", "/css-vertical"],
  ["CSS (Horizontal)", "/css-horizontal"],
  ["HexDraw", "/hexdraw"],
  ["Flower", "/flower"],
  ["Island", "/island"],
  ["About", "/about"],
];

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
              Examples
              <ul class="dropdown">
                {links.map((link) => (
                  <li>
                    <Link activeClassName="active" href={link[1]}>
                      {link[0]}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
);
