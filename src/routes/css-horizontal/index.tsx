import { h } from "preact";
import Async from "react-async";

const getGrid = async () => {
  const res = (await fetch("assets/island.txt")) as any;
  if (!res.ok) throw new Error(res.statusText);
  let text = await res.text();
  return text
    .split("\n")
    .filter((x: String) => x.length)
    .map((x: String) =>
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

const CssHorizontal = () => (
  <Async promiseFn={getGrid}>
    {({ data, error, isPending }: Props) => {
      if (isPending) return "Loading...";
      if (error) return `Something went wrong: ${error.message}`;
      if (data)
        return (
          <div class="app-route container">
            <div class="css-horizontal">
              <div class="css-horizontal-container">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        );
      return null;
    }}
  </Async>
);

export default CssHorizontal;
