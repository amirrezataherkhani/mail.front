export const TURN_BACK_FROM_CHAT = "[CHAT APP] TURN BACK FROM CHAT";

export function turnBackFromChat(chat) {
  return {
    type: TURN_BACK_FROM_CHAT,
    payload: chat,
  };
}
