import { SettingsScreen } from './settingsScreen'
/*
* Features
* Start times
* End times
* Eat days
* Permanent face icon (can eat or only water)
*/

const start = async () => {
  let settings = new SettingsScreen();
  settings.render();
}

start();