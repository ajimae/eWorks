import SimpleCryptoJs from 'simple-crypto-js';
import { config } from 'dotenv';

config();
const simpleCryptoJs = new SimpleCryptoJs(process.env.SECRET_KEY);
/**
 *
 * @class Encryption
 *
 * @method { String } encrypt
 * @method { String } decrypt
 */
export default class Encryption {
  /**
   *
   * @description method to encrypt data
   *
   * @param { any } data
   *
   * @returns { String } encryptedText
   */
  static encrypt = (data) => {
    const encryptedText = simpleCryptoJs.encrypt(data.toString());

    return encryptedText;
  };

  /**
   *
   * @description method to decrypt encryted data
   *
   * @param { any } data
   *
   * @returns { String } decryptedText
   */
  static decrypt = (data) => {
    const decryptedText = simpleCryptoJs.decrypt(data);

    return decryptedText;
  }
}
