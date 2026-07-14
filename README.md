# @smokyy14/validators-js

A validators library with a **unified, consistent API**, inspired by Python's [`validators`](https://github.com/python-validators/validators) package. In npm, this kind of validation is scattered across dozens of separate packages, each with its own signature and conventions — here everything lives under a single style.

```ts
import { isEmail, isURL, isCreditCard } from '@smokyy14/validators-js';

isEmail('user@example.com');        // true
isURL('https://example.com');       // true
isCreditCard('4111111111111111');   // { valid: true, type: 'visa' }
```

## Why

- **One API**: every function follows the `isX(value, options?)` pattern.
- **Zero runtime dependencies.**
- **Native TypeScript**, with exported types for every `options` object.
- **Tree-shakeable**: only import what you use.
- **ESM + CJS**: works in any modern or legacy Node project.

## Installation

```bash
npm install @smokyy14/validators-js
```

## Available validators

| Function | Description |
|---|---|
| `isEmail(value, options?)` | Validates email addresses |
| `isURL(value, options?)` | Validates URLs (protocol, host, IP, port) |
| `isDomain(value, options?)` | Validates domain names (FQDN) |
| `isIP(value, options?)` / `isIPv4(value)` / `isIPv6(value)` | Validates IP addresses |
| `isCreditCard(value)` | Validates a card number (Luhn) and detects the brand |
| `isUUID(value, options?)` | Validates UUIDs, with support for versions (1-5) and the nil UUID |
| `isMACAddress(value, options?)` | Validates MAC addresses |
| `isSlug(value, options?)` | Validates URL-style slugs |
| `isHash(value, algorithm)` | Validates hash format (md5, sha1, sha256, sha384, sha512) |
| `isLength(value, options?)` | Validates that a string's length falls within a range |

## Examples

### Email

```ts
isEmail('user@example.com');                        // true
isEmail('user@localhost', { requireTld: false });    // true
```

### URL

```ts
isURL('https://example.com');                         // true
isURL('ftp://files.example.com', { protocols: ['ftp'] }); // true
isURL('http://127.0.0.1', { allowIP: true });          // true
```

### Credit card

```ts
const result = isCreditCard('4111111111111111');
// { valid: true, type: 'visa' }
```

### UUID

```ts
isUUID('123e4567-e89b-42d3-a456-426614174000', { version: 4 }); // true
isUUID('00000000-0000-0000-0000-000000000000', { allowNil: true }); // true
```

### Hash

```ts
isHash('d41d8cd98f00b204e9800998ecf8427e', 'md5'); // true
```

See more examples in [`examples/basic-usage.ts`](./examples/basic-usage.ts).

## Development

```bash
npm install     # install dependencies
npm test        # run tests (vitest)
npm run build   # generate dist/ (ESM + CJS + types)
npm run lint    # run eslint
```

## Contributing

PRs are welcome. If you add a new validator, follow the existing pattern:

1. Function in `src/validators/<name>.ts`.
2. `options` types in `src/types.ts`.
3. Export in `src/index.ts`.
4. Tests in `tests/<name>.test.ts`.

## License

MIT