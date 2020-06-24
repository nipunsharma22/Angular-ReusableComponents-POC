export class Util {
  static removeHypenCharacters(str: string) {
    let replacedString = str.replace(/-/g, "").replace(/\//g, "");
    return replacedString.toLowerCase();
  }
}
