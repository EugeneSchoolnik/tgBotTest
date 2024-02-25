import fs from "fs";
import { join } from "path";

class ChatIdStore {
  static arr: number[] = [];

  static async load() {
    ChatIdStore.arr = JSON.parse(fs.readFileSync(join(__dirname, "data.json"), "utf-8"));
  }
  static add(id: number) {
    if (!ChatIdStore.arr.includes(id)) ChatIdStore.arr.push(id);
  }
  static save() {
    fs.writeFileSync(join(__dirname, "data.json"), JSON.stringify(ChatIdStore.arr));
  }
}

export default ChatIdStore;
