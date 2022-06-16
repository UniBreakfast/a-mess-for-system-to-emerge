import { FileManager } from "./file-manager.js"

const wrapper = document.getElementById("wrapper")
const fileManager = new FileManager

fileManager.settleAt(wrapper)
fileManager.render()
fileManager.goTo(".")
