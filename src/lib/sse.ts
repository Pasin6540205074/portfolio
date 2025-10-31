// เก็บสถานะ client ไว้ที่ module scope
type Client = { controller: ReadableStreamDefaultController };

const clients = new Map<string, Client>();

export function addClient(sessionId: string, controller: ReadableStreamDefaultController) {
  clients.set(sessionId, { controller });
}

export function removeClient(sessionId: string) {
  clients.delete(sessionId);
}

export function sendToSession(sessionId: string, data: any): boolean {
  const c = clients.get(sessionId);
  if (!c) return false;
  c.controller.enqueue(`data: ${JSON.stringify(data)}\n\n`);
  return true;
}

// (ถ้าต้อง broadcast)
// export function broadcast(data: any) { for (const [id] of clients) sendToSession(id, data); }
