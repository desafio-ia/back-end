
export interface BcryptProviderPort {
    hash(password: string): Promise<string>
    verify(passwordType: string, passwordOriginal: string): Promise<boolean>;
}