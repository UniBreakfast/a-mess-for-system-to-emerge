import { FileManager } from "./file-manager.js"

import { apiCall } from "./api-call.js"

const wrapper = document.getElementById("wrapper")
const fileManager = new FileManager

fileManager.settleAt(wrapper)
fileManager.render()
fileManager.goTo(".")

apiCall("dependencies").then(console.log)
