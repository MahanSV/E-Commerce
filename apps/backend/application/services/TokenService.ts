import nodeJose from 'node-jose';
import env from "#substructure/env.ts";

const {JWK, JWE, parse} = nodeJose
const generateJWSToken = async (raw: any, format: string = 'compact', contentAlg: string = "A256GCM", alg: string = "RSA-OAEP"): Promise<string> => {
    // const _publicKey = readFileFromRoot('tokenEncryptingKey.txt')
    const _publicKey = env.tokenEncryptingKey;
    const publicKey = await JWK.asKey(_publicKey, "pem");
    const buffer = Buffer.from(JSON.stringify(raw))
    const encrypted = await JWE.createEncrypt({format: format as "compact" | "general" | "flattened", contentAlg, fields: {alg}}, publicKey)
        .update(buffer).final();
    return encrypted;
}

const decryptJWSToken = async (encryptedBody: any): Promise<string> => {
    // const _privateKey = readFileFromRoot('tokenDecryptingKey.txt');
    const _privateKey = env.tokenDecryptingKey;
    const keystore = JWK.createKeyStore();
    await keystore.add(await JWK.asKey(_privateKey, "pem"));
    let outPut = parse.compact(encryptedBody);
    let decryptedVal = await outPut.perform(keystore);
    let claims = Buffer.from((decryptedVal as any).plaintext).toString();
    return claims;
}

export {
    // eslint-disable-next-line import/prefer-default-export
    generateJWSToken,
    decryptJWSToken
}