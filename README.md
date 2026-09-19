# @jvavscratch/types

The Scratch 3.0 data model that every other jvavscratch package is built on: the
block opcode enum, the `project.json` structures, and the helpers that construct
Scratch input tuples and block IDs.

This package is a pure leaf — it has **no dependencies of its own**, which is what
keeps the dependency chain (`types ← core ← utils ← generator / decompiler ← cli`)
acyclic.

## What's in it

- `BlockOpCode` — every Scratch block opcode the compiler can emit.
- `Project`, `Sprite`, `Block`, `Mutation`, `Costume`, `Sound`, `Variable` — the `project.json` shape.
- `buildData`, `generatedData`, `typeData` — the contracts generators are written against.
- `ScratchType`, `ScratchInput`, and the only sanctioned constructors for input
  slots: `getScratchType`, `getSubstack`, `getMenu`, `getVariable`,
  `getBlockNumber`, `getColor`, `getBroadcast`, `getList`.
- `uuid()` — collision-resistant IDs for blocks.

Scratch stores an input slot as a 4-tuple such as `[3, blockId, [type, value], ...]`.
Those tuples are easy to get subtly wrong, which is why the constructors above
exist; building them by hand is not supported.

`uuid()` draws from `crypto.randomInt`, not `Math.random()`. Block IDs are written
into the user's `.sb3` and a collision means two blocks share an ID and the
`project.json` is corrupt; V8's `Math.random()` state can also be recovered from a
small number of outputs.

## Install

This package is not published to npm. Depend on it straight from GitHub:

```json
{ "dependencies": { "@jvavscratch/types": "github:Jvavscratch/types" } }
```

If you want to *use* jvavscratch rather than build against its internals, install
the CLI instead:

```bash
npm install -g github:Jvavscratch/cli
```

## Usage

```ts
import { BlockOpCode, ScratchType, getScratchType, uuid } from '@jvavscratch/types';

const input = getScratchType(ScratchType.number, 10); // a Scratch input tuple
const id = uuid('block');
```

Namespace imports are available when you want the origin to stay visible at the
call site:

```ts
import { types, scratchType, scratchUuid } from '@jvavscratch/types';
```

## Documentation

<https://jvavscratch.github.io/docs/modules/types>

## License

MPL-2.0
