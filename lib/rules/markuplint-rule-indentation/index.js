"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = require("../../parser");
const rule_1 = require("../../rule");
/**
 * `Indentation`
 *
 * *Core rule*
 */
class default_1 extends rule_1.default {
    constructor() {
        super(...arguments);
        this.name = 'indentation';
    }
    verify(document, config, ruleset) {
        return __awaiter(this, void 0, void 0, function* () {
            const reports = [];
            let lastNode;
            document.walk((node) => {
                if (lastNode instanceof parser_1.TextNode) {
                    const matched = lastNode.textContent.match(/\n(\s+$)/);
                    if (matched) {
                        const spaces = matched[1];
                        if (!spaces) {
                            throw new TypeError(`Expected error.`);
                        }
                        if (config.value === 'tab') {
                            if (!/^\t+$/.test(spaces)) {
                                const line = node.line;
                                const col = 1;
                                reports.push({
                                    level: this.defaultLevel,
                                    message: 'Expected spaces. Indentaion is required tabs.',
                                    line,
                                    col,
                                    raw: `${lastNode.textContent}${node}`,
                                });
                            }
                        }
                        if (typeof config.value === 'number') {
                            if (!/^ +$/.test(spaces)) {
                                const line = node.line;
                                const col = 1;
                                reports.push({
                                    level: this.defaultLevel,
                                    message: 'Expected spaces. Indentaion is required spaces.',
                                    line,
                                    col,
                                    raw: `${lastNode.textContent}${node}`,
                                });
                            }
                            else if (spaces.length % config.value) {
                                const line = node.line;
                                const col = 1;
                                reports.push({
                                    level: this.defaultLevel,
                                    message: `Expected spaces. Indentaion is required ${config.value} width spaces.`,
                                    line,
                                    col,
                                    raw: `${lastNode.textContent}${node}`,
                                });
                            }
                        }
                    }
                }
                lastNode = node;
            });
            return reports;
        });
    }
}
exports.default = default_1;