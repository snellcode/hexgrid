export const MapService = {
  // water 0
  // grassland 1
  // plains 2
  // desert 3
  // mountains 4
  clamps: [0.01, 0.18, 0.4, 0.6, 1.0],

  async getMap() {
    const cb = new Date().getTime();
    const res = await fetch(`/assets/island-large.txt?${cb}`);
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
  },

  getTileColor(value: any) {
    if (value <= this.clamps[0]) {
      return 0x193298;
    }
    if (value > this.clamps[0] && value < this.clamps[1]) {
      return 0x085c00;
    }
    if (value > this.clamps[1] && value < this.clamps[2]) {
      return 0xa28456;
    }
    if (value > this.clamps[2] && value < this.clamps[3]) {
      return 0xe0bd91;
    }
    if (value > this.clamps[3] && value < this.clamps[4]) {
      return 0x584748;
    }
  },
};
