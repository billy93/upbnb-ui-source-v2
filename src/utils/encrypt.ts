const key = 15;

export const encrypt = (account: string) => shift(reverse(account.substring(2)), key);
export const decrypt = (encrypted: string) => "0x" + reverse(shift(encrypted, 26 - key));

const reverse = (str: string) => str.split("").reverse().join("");

const shift = (str: string, amount: number): string => {
  var output = "";

  for (var i = 0; i < str.length; i++) {
    // Get the character we'll be appending
    var c = str[i];

    var code = str.charCodeAt(i);

    // Uppercase letters
    if (code >= 65 && code <= 90) {
      c = String.fromCharCode(((code - 65 + amount) % 26) + 65);
    }

    // Lowercase letters
    else if (code >= 97 && code <= 122) {
      c = String.fromCharCode(((code - 97 + amount) % 26) + 97);
    }

    // Append
    output += c;
  }

  return output;
};