/* Arrg.js 0.0.1
 * Copyright © 2015 Gion Kunz
 * Free to use under the WTFPL license.
 * http://www.wtfpl.net/
 */
"use strict";

var Arrgh = require("./arrgh");
var ArrghUtil = require("./arrgh-util");

if (window) {
  window.Arrgh = Arrgh;
  window.Arrgh.Util = ArrghUtil;
}