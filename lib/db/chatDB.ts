import { messageInterface } from "@/Types/ContactsType";
import { DBSchema, IDBPDatabase, openDB } from "idb";

interface ChatDB extends DBSchema {
  messages: {
    key: string;
    value: messageInterface;
    indexes: {
      "by-partner": string;
    };
  };
}

let dbInstance: IDBPDatabase<ChatDB> | null = null;
export async function getDB() {
  if (dbInstance) return dbInstance;

  dbInstance = await openDB<ChatDB>("sendme-chat-db", 1, {
    upgrade(db) {
      const store = db.createObjectStore("messages", { keyPath: "id" });
      store.createIndex("by-partner", "partnerid");
    },
  });
  return dbInstance;
}
