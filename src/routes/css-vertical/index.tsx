import { h } from "preact";
import Async from "react-async";
import './style.scss';

const getGrid = async () => {
  const res = await fetch("assets/island.txt");
  if (!res.ok) throw new Error(res.statusText);
  let text = await res.text();
  return text
    .split("\n")
    .filter((x) => x.length)
    .map((x) =>
      x
        .split(",")
        .filter((x) => x !== "")
        .map((x) => parseFloat(x))
    );
};

type Props = {
  data: any;
  error: any;
  isPending: any;
};

const CssVertical = () => (
  <Async promiseFn={getGrid}>
    {({ data, error, isPending }: Props) => {
      if (isPending) return "Loading...";
      if (error) return `Something went wrong: ${error.message}`;
      if (data)
        return (
          <div class="app-route container">
            <div class="css-vertical">
              <div class="css-vertical-container">
                {[...Array(200)].map((e, i) => <div></div>)}  
              </div>
            </div>
          </div>
        );
      return null;
    }}
  </Async>
);

export default CssVertical;
