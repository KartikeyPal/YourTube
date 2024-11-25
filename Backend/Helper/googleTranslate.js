import data from '@google-cloud/translate';
import path from 'path'
import dotenv from "dotenv"
import { fileURLToPath } from 'url';

const {Translate} = data.v2;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const CREDENTIALS= JSON.parse(process.env.CREDENTIALS);

const translate = new Translate({
    credentials: CREDENTIALS,
    projectId: CREDENTIALS.project_id
});

export const textTranslation = async(text,target)=>{
    const [translation] = await translate.translate(text,target);
    return translation;
}

 
