"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownPageEvent = void 0;
/**
 * An event emitted before and after the markdown of a page is rendered.
 *
 * @event
 */
class MarkdownPageEvent extends Event {
    /**
     * @ignore
     */
    constructor(name, model) {
        super(name);
        this.model = model;
    }
}
exports.MarkdownPageEvent = MarkdownPageEvent;
/**
 * Triggered before a document will be rendered.
 * @event
 */
MarkdownPageEvent.BEGIN = 'beginPage';
/**
 * Triggered after a document has been rendered, just before it is written to disc.
 * @event
 */
MarkdownPageEvent.END = 'endPage';
