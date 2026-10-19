import { messageInterface } from "@/Types/ContactsType";
import { getDB } from "./chatDB";

export async function saveMessage(msg: messageInterface) {
  const db = await getDB();
  await db.put("messages", msg);
}

export async function getMessagesForContact(
  partnerid: string,
): Promise<messageInterface[]> {
  const db = await getDB();
  const messages = await db.getAllFromIndex(
    "messages",
    "by-partner",
    partnerid,
  );
  return messages;
}

export async function saveMessagesBulk(messages: messageInterface[]) {
  const db = await getDB();
  const tx = db.transaction("messages", "readwrite");
  await Promise.all(messages.map((msg) => tx.store.put(msg)));
  await tx.done;
}

export async function deleteMessage(id: string) {
  const db = await getDB();
  await db.delete("messages", id);
}
