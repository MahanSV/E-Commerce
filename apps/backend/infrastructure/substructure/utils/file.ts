import * as fs from "fs";
import * as path from "path";

const readFileFromRoot = (filename: string): string => {
    const rootPath = process.cwd()
    const fileData = undefined;

    try {
        const data = fs.readFileSync(path.join(rootPath,filename), 'utf8');

        return data;
    } catch (err) {
        throw err;
    }
}

export {
    readFileFromRoot
}
