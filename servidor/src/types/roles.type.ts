import { Document } from "mongoose";

export interface AuthenticatedDocumentRole extends Document {
    roles: string;
}
