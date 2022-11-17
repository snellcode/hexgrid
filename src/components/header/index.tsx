import { h } from "preact";
import { Link } from "preact-router/match";

let links = [
  ["CSS (Vertical)", "/css-vertical"],
  ["CSS (Horizontal)", "/css-horizontal"],
  ["HexDraw", "/hexdraw"],
  ["Flower", "/flower"],
  ["Island", "/island"],
  ["About", "/about"],
];

export const AppHeader = () => {
  return (
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
                      <a href={link[1]}>{link[0]}</a>
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
};
