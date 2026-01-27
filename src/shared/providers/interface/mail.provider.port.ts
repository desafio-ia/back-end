
export interface MailProviderPort {
  send(to: string | string[], subject: string, html: string): Promise<void>;
}