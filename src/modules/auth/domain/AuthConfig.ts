type authProps = {
    name: string,
    email: string,
    password: string,
}

export class AuthConfig {

    private _name: string;
    private _email: string;
    private _password: string;

    constructor(data: authProps) {
        this.validateName(data.name);
        this.validateEmail(data.email);
        this.validatePassword(data.password);

        this._name = data.name;
        this._email = data.email;
        this._password = data.password;
    }

    get name(): string { return this._name; }
    get email(): string { return this._email; }
    get password(): string {return this._password;}

    private validateName(name: string): void {
        if (!name || name.trim().length < 3) {
            throw new Error('O nome deve ter no mínimo 3 caracteres.');
        }
    }

    private validateEmail(email: string): void {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            throw new Error('O formato do e-mail é inválido.');
        }
    }

    private validatePassword(password: string): void {
        const minLength = 6;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (password.length < minLength) {
            throw new Error(`A senha deve ter pelo menos ${minLength} caracteres.`);
        }
        
        if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
             throw new Error('A senha deve conter: maiúscula, minúscula, número e caractere especial.');
        }
    }
}