
import { ClientRequestArgs } from 'http';

export interface CustomRequest extends ClientRequestArgs{
    body: { [string]: string | number | boolean },
    files?: {[string]: {}  }
}