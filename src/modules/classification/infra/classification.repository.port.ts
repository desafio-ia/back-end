import { Classification } from "../domain/classification.domain";


export interface ClassificationRepositoryPort {
    save(classification: Classification): Promise<void>;
    findById(id: string): Promise<Classification | null>;
    findByUserId(userId: string): Promise<Classification[]>;
    delete(id: string): Promise<void>;
}