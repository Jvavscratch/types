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
 * 生成定长随机串。
 *
 * 注意用的是 `crypto.randomInt` 而**不是** `Math.random()`:块 ID 直接写进
 * 用户产出的 `.sb3`,必须保证唯一。V8 的 `Math.random()` 内部状态可由少量
 * 输出反推,并发构建或长跑时还可能碰撞,而碰撞的后果是两个块 ID 相同、
 * project.json 损坏。`randomInt(n)` 在 [0, n) 上均匀且无取模偏置。
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
    // 注意:这一串里第 37 个字符是 U+62E2「拢」,不是 ASCII —— 显然某次编码
    // 转换损坏了原始字符,但**无法确定原意**(可能是 `~`、`|` 或反引号附近的
    // 某符号),而它已被 motion.ts / sensing.ts 用来生成 Scratch 变量名,贸然
    // 替换会改变这些名字。故原样保留,U+62E2 本身在 Scratch 里合法。
    alphanumeric_with_symbols: "0123456789abcdefghijklmnopqrstuvwxyz`!拢$%^&*()_+"
}
