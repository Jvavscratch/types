/*******************************************************************
* Copyright         : 2024 saaawdust
* File Name         : scratch-uuid.ts
* Description       : Generates a UUID
*
* Revision History  :
* Date        Author          Comments
* ------------------------------------------------------------------
* 10/12/2025  NeuronPulse     Modified
* 09/19/2026  NeuronPulse     Use CSPRNG instead of Math.random
/******************************************************************/

import { randomInt } from "crypto";

/**
 * Generates a fixed-length random string.
 *
 * Note that this uses `crypto.randomInt` and **not** `Math.random()`: block IDs
 * go straight into the `.sb3` a user produces, so they have to be unique. The
 * internal state of V8's `Math.random()` can be recovered from a handful of
 * outputs, and it can also collide across concurrent builds or long-running
 * processes -- and a collision means two blocks end up sharing an ID and
 * project.json is corrupted. `randomInt(n)` is uniform over [0, n) and free of
 * modulo bias.
 */
export function uuid(Include: String, Length = 32) {
    let result = '';

    for (let i = 0; i < Length; i++) {
        result += Include.charAt(randomInt(Include.length));
    }

    return result;
}

export const includes = {
    scratch_alphanumeric: "0123456789abcdef",
    alphanumeric: "0123456789abcdefghijklmnopqrstuvwxyz",
    // Note: the 37th character of this string is U+62E2, not ASCII -- some
    // encoding conversion clearly mangled the original character, but **what it
    // was meant to be cannot be determined** (it may have been `~`, `|`, or some
    // symbol near the backtick). It is already used by motion.ts / sensing.ts to
    // generate Scratch variable names, so replacing it would silently change
    // those names. It is therefore kept exactly as it is; U+62E2 is itself a
    // legal character in Scratch.
    alphanumeric_with_symbols: "0123456789abcdefghijklmnopqrstuvwxyz`!拢$%^&*()_+"
}
