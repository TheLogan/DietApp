import 'espruino';

export class SettingsScreen {
  render() {
    const Layout = require("Layout");
    const layout = new Layout({
      type: "txt", font: "6x8", label: "Hello World"
    });
    // @ts-ignore
    g.clear();
    layout.render();
  }
}