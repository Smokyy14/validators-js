interface EmailOptions {
    /** Permite direcciones con nombre de dominio sin TLD (ej: user@localhost) */
    requireTld?: boolean;
    /** Longitud máxima permitida para la parte local (antes del @). RFC 5321 = 64 */
    maxLocalLength?: number;
}
interface URLOptions {
    /** Protocolos permitidos. Por defecto: ['http', 'https'] */
    protocols?: string[];
    /** Si es true, exige que la URL tenga protocolo explícito */
    requireProtocol?: boolean;
    /** Si es true, exige que el host tenga un TLD válido */
    requireTld?: boolean;
    /** Permite direcciones IP como host (ej: http://127.0.0.1) */
    allowIP?: boolean;
}
type IPVersion = 4 | 6;
interface IPOptions {
    /** Restringe la validación a una versión específica */
    version?: IPVersion;
}
type CardType = 'visa' | 'mastercard' | 'amex' | 'discover' | 'diners_club' | 'jcb' | 'unionpay' | 'unknown';
interface CreditCardResult {
    valid: boolean;
    type: CardType;
}
type UUIDVersion = 1 | 2 | 3 | 4 | 5;
interface UUIDOptions {
    /** Restringe a una versión específica de UUID */
    version?: UUIDVersion;
    /** Acepta el UUID nulo (00000000-0000-0000-0000-000000000000) */
    allowNil?: boolean;
}
interface MACAddressOptions {
    /** Separador esperado. Por defecto acepta ':' y '-' */
    separator?: ':' | '-' | 'none';
}
type HashAlgorithm = 'md5' | 'sha1' | 'sha256' | 'sha384' | 'sha512';
interface LengthOptions {
    min?: number;
    max?: number;
}
interface SlugOptions {
    /** Permite guiones bajos además de guiones medios */
    allowUnderscore?: boolean;
}

/**
 * Valida una dirección de email.
 *
 * @example
 * isEmail('user@example.com') // true
 * isEmail('user@localhost', { requireTld: false }) // true
 */
declare function isEmail(value: string, options?: EmailOptions): boolean;

interface DomainOptions {
    /** Exige que el dominio tenga un TLD (ej: rechaza 'localhost') */
    requireTld?: boolean;
    /** Permite un solo label sin puntos (ej: 'localhost') */
    allowSingleLabel?: boolean;
}
/**
 * Valida un nombre de dominio (FQDN - Fully Qualified Domain Name).
 *
 * @example
 * isDomain('example.com') // true
 * isDomain('sub.example.co.uk') // true
 * isDomain('localhost', { requireTld: false, allowSingleLabel: true }) // true
 */
declare function isDomain(value: string, options?: DomainOptions): boolean;

/**
 * Valida una URL.
 *
 * @example
 * isURL('https://example.com') // true
 * isURL('ftp://files.example.com', { protocols: ['ftp'] }) // true
 * isURL('http://127.0.0.1', { allowIP: true }) // true
 */
declare function isURL(value: string, options?: URLOptions): boolean;

/**
 * Valida una dirección IP. Por defecto acepta tanto IPv4 como IPv6.
 *
 * @example
 * isIP('192.168.1.1') // true
 * isIP('::1') // true
 * isIP('192.168.1.1', { version: 6 }) // false
 */
declare function isIP(value: string, options?: IPOptions): boolean;
/** Valida específicamente una dirección IPv4. */
declare function isIPv4(value: string): boolean;
/** Valida específicamente una dirección IPv6. */
declare function isIPv6(value: string): boolean;

/**
 * Valida un número de tarjeta de crédito usando el algoritmo de Luhn
 * y devuelve además la marca detectada (visa, mastercard, amex, etc).
 *
 * @example
 * isCreditCard('4111111111111111') // { valid: true, type: 'visa' }
 */
declare function isCreditCard(value: string): CreditCardResult;

/**
 * Valida un UUID, opcionalmente restringiendo a una versión (1-5).
 *
 * @example
 * isUUID('123e4567-e89b-12d3-a456-426614174000') // true
 * isUUID('123e4567-e89b-42d3-a456-426614174000', { version: 4 }) // true
 */
declare function isUUID(value: string, options?: UUIDOptions): boolean;

/**
 * Valida una dirección MAC (formato XX:XX:XX:XX:XX:XX, con guiones, o sin separador).
 *
 * @example
 * isMACAddress('00:1A:2B:3C:4D:5E') // true
 * isMACAddress('001A2B3C4D5E', { separator: 'none' }) // true
 */
declare function isMACAddress(value: string, options?: MACAddressOptions): boolean;

/**
 * Valida un slug (formato típico de URL: 'mi-articulo-2024').
 *
 * @example
 * isSlug('mi-articulo-2024') // true
 * isSlug('Mi Articulo') // false
 * isSlug('mi_articulo', { allowUnderscore: true }) // true
 */
declare function isSlug(value: string, options?: SlugOptions): boolean;

/**
 * Valida que un string tenga el formato de un hash hexadecimal
 * para el algoritmo indicado (md5, sha1, sha256, sha384, sha512).
 *
 * Nota: esto valida el *formato* (longitud + charset hex), no
 * puede confirmar que el hash corresponda a un contenido específico.
 *
 * @example
 * isHash('d41d8cd98f00b204e9800998ecf8427e', 'md5') // true
 */
declare function isHash(value: string, algorithm: HashAlgorithm): boolean;

/**
 * Valida que la longitud de un string esté dentro de un rango.
 *
 * @example
 * isLength('hola', { min: 2, max: 10 }) // true
 */
declare function isLength(value: string, options?: LengthOptions): boolean;

export { type CardType, type CreditCardResult, type DomainOptions, type EmailOptions, type HashAlgorithm, type IPOptions, type IPVersion, type LengthOptions, type MACAddressOptions, type SlugOptions, type URLOptions, type UUIDOptions, type UUIDVersion, isCreditCard, isDomain, isEmail, isHash, isIP, isIPv4, isIPv6, isLength, isMACAddress, isSlug, isURL, isUUID };
