"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  isCreditCard: () => isCreditCard,
  isDomain: () => isDomain,
  isEmail: () => isEmail,
  isHash: () => isHash,
  isIP: () => isIP,
  isIPv4: () => isIPv4,
  isIPv6: () => isIPv6,
  isLength: () => isLength,
  isMACAddress: () => isMACAddress,
  isSlug: () => isSlug,
  isURL: () => isURL,
  isUUID: () => isUUID
});
module.exports = __toCommonJS(index_exports);

// src/utils/regexPatterns.ts
var EMAIL_LOCAL_PART = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/;
var DOMAIN_LABEL = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/;
var TLD = /^[a-zA-Z]{2,63}$/;
var IPV4 = /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;
var IPV6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]+|::(ffff(:0{1,4})?:)?((25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(25[0-5]|2[0-4]\d|1?\d?\d)|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(25[0-5]|2[0-4]\d|1?\d?\d))$/;
var MAC_WITH_SEPARATOR = /^([0-9a-fA-F]{2}([:-]))([0-9a-fA-F]{2}\2){4}[0-9a-fA-F]{2}$/;
var MAC_NO_SEPARATOR = /^[0-9a-fA-F]{12}$/;
var UUID_GENERIC = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
var UUID_NIL = /^0{8}-0{4}-0{4}-0{4}-0{12}$/;
var SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
var SLUG_WITH_UNDERSCORE = /^[a-z0-9]+([-_][a-z0-9]+)*$/;
var HASH_LENGTHS = {
  md5: 32,
  sha1: 40,
  sha256: 64,
  sha384: 96,
  sha512: 128
};
var HEX_ONLY = /^[a-fA-F0-9]+$/;

// src/validators/email.ts
function isEmail(value, options = {}) {
  if (typeof value !== "string" || value.length === 0) return false;
  const { requireTld = true, maxLocalLength = 64 } = options;
  const atIndex = value.lastIndexOf("@");
  if (atIndex <= 0 || atIndex === value.length - 1) return false;
  const localPart = value.slice(0, atIndex);
  const domainPart = value.slice(atIndex + 1);
  if (localPart.length === 0 || localPart.length > maxLocalLength) return false;
  if (localPart.startsWith(".") || localPart.endsWith(".")) return false;
  if (localPart.includes("..")) return false;
  if (!EMAIL_LOCAL_PART.test(localPart)) return false;
  return isDomainValid(domainPart, requireTld);
}
function isDomainValid(domain, requireTld) {
  if (domain.length === 0 || domain.length > 255) return false;
  const labels = domain.split(".");
  if (requireTld && labels.length < 2) return false;
  for (let i = 0; i < labels.length; i++) {
    const label = labels[i];
    if (!label || !DOMAIN_LABEL.test(label)) return false;
  }
  if (requireTld) {
    const tld = labels[labels.length - 1];
    if (!tld || !TLD.test(tld)) return false;
  }
  return true;
}

// src/validators/domain.ts
function isDomain(value, options = {}) {
  const { requireTld = true, allowSingleLabel = false } = options;
  if (typeof value !== "string" || value.length === 0 || value.length > 255) {
    return false;
  }
  if (value.startsWith(".") || value.endsWith(".") || value.includes("..")) {
    return false;
  }
  const labels = value.split(".");
  if (labels.length === 1 && !allowSingleLabel) return false;
  if (requireTld && labels.length < 2) return false;
  for (const label of labels) {
    if (!DOMAIN_LABEL.test(label)) return false;
  }
  if (requireTld) {
    const tld = labels[labels.length - 1];
    if (!tld || !TLD.test(tld)) return false;
  }
  return true;
}

// src/validators/ip.ts
function isIP(value, options = {}) {
  if (typeof value !== "string" || value.length === 0) return false;
  const { version } = options;
  if (version === 4) return isIPv4(value);
  if (version === 6) return isIPv6(value);
  return isIPv4(value) || isIPv6(value);
}
function isIPv4(value) {
  if (typeof value !== "string") return false;
  return IPV4.test(value);
}
function isIPv6(value) {
  if (typeof value !== "string") return false;
  return IPV6.test(value);
}

// src/validators/url.ts
function isURL(value, options = {}) {
  if (typeof value !== "string" || value.length === 0) return false;
  const {
    protocols = ["http", "https"],
    requireProtocol = true,
    requireTld = true,
    allowIP = true
  } = options;
  let rest = value;
  let hasProtocol = false;
  const protocolMatch = value.match(/^([a-zA-Z][a-zA-Z0-9+.-]*):\/\//);
  if (protocolMatch) {
    hasProtocol = true;
    const scheme = protocolMatch[1]?.toLowerCase();
    if (!scheme || !protocols.includes(scheme)) return false;
    rest = value.slice(protocolMatch[0].length);
  } else if (requireProtocol) {
    return false;
  }
  if (rest.length === 0) return false;
  const hostEnd = rest.search(/[/?#]/);
  const hostAndPort = hostEnd === -1 ? rest : rest.slice(0, hostEnd);
  if (hostAndPort.length === 0) return false;
  let host;
  let port;
  if (hostAndPort.startsWith("[")) {
    const closingBracket = hostAndPort.indexOf("]");
    if (closingBracket === -1) return false;
    host = hostAndPort.slice(1, closingBracket);
    const portPart = hostAndPort.slice(closingBracket + 1);
    if (portPart.length > 0) {
      if (!portPart.startsWith(":")) return false;
      port = portPart.slice(1);
    }
  } else {
    const parts = hostAndPort.split(":");
    host = parts[0] ?? "";
    port = parts[1];
    if (parts.length > 2) return false;
  }
  if (port !== void 0) {
    if (!/^\d+$/.test(port)) return false;
    const portNum = Number(port);
    if (portNum < 1 || portNum > 65535) return false;
  }
  const hostIsDomain = isDomain(host, { requireTld, allowSingleLabel: !requireTld });
  const hostIsIP = allowIP && isIP(host);
  if (!hostIsDomain && !hostIsIP) return false;
  return hasProtocol || !requireProtocol;
}

// src/validators/creditCard.ts
var CARD_PATTERNS = [
  { type: "visa", pattern: /^4\d{12}(\d{3})?(\d{3})?$/ },
  { type: "mastercard", pattern: /^(5[1-5]\d{14}|2(2[2-9]\d{12}|[3-6]\d{13}|7[01]\d{12}|720\d{12}))$/ },
  { type: "amex", pattern: /^3[47]\d{13}$/ },
  { type: "discover", pattern: /^6(?:011|5\d{2})\d{12}$/ },
  { type: "diners_club", pattern: /^3(?:0[0-5]|[68]\d)\d{11}$/ },
  { type: "jcb", pattern: /^(?:2131|1800|35\d{3})\d{11}$/ },
  { type: "unionpay", pattern: /^62\d{14,17}$/ }
];
function isCreditCard(value) {
  if (typeof value !== "string") return { valid: false, type: "unknown" };
  const digitsOnly = value.replace(/[\s-]/g, "");
  if (!/^\d{12,19}$/.test(digitsOnly)) {
    return { valid: false, type: "unknown" };
  }
  const type = detectCardType(digitsOnly);
  const luhnValid = passesLuhnCheck(digitsOnly);
  return { valid: luhnValid, type };
}
function detectCardType(digits) {
  for (const { type, pattern } of CARD_PATTERNS) {
    if (pattern.test(digits)) return type;
  }
  return "unknown";
}
function passesLuhnCheck(digits) {
  let sum = 0;
  let shouldDouble = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = Number(digits[i]);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

// src/validators/uuid.ts
function isUUID(value, options = {}) {
  if (typeof value !== "string") return false;
  const { version, allowNil = false } = options;
  if (UUID_NIL.test(value)) return allowNil;
  if (!UUID_GENERIC.test(value)) return false;
  if (version === void 0) return true;
  const versionDigit = value.charAt(14);
  return versionDigit === String(version);
}

// src/validators/mac.ts
function isMACAddress(value, options = {}) {
  if (typeof value !== "string") return false;
  const { separator } = options;
  if (separator === "none") return MAC_NO_SEPARATOR.test(value);
  if (separator === ":" || separator === "-") {
    const parts = value.split(separator);
    if (parts.length !== 6) return false;
    return parts.every((part) => /^[0-9a-fA-F]{2}$/.test(part));
  }
  return MAC_WITH_SEPARATOR.test(value) || MAC_NO_SEPARATOR.test(value);
}

// src/validators/slug.ts
function isSlug(value, options = {}) {
  if (typeof value !== "string" || value.length === 0) return false;
  const { allowUnderscore = false } = options;
  return allowUnderscore ? SLUG_WITH_UNDERSCORE.test(value) : SLUG.test(value);
}

// src/validators/hash.ts
function isHash(value, algorithm) {
  if (typeof value !== "string") return false;
  const expectedLength = HASH_LENGTHS[algorithm];
  if (expectedLength === void 0) return false;
  if (value.length !== expectedLength) return false;
  return HEX_ONLY.test(value);
}

// src/validators/length.ts
function isLength(value, options = {}) {
  if (typeof value !== "string") return false;
  const { min = 0, max = Infinity } = options;
  return value.length >= min && value.length <= max;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isCreditCard,
  isDomain,
  isEmail,
  isHash,
  isIP,
  isIPv4,
  isIPv6,
  isLength,
  isMACAddress,
  isSlug,
  isURL,
  isUUID
});
