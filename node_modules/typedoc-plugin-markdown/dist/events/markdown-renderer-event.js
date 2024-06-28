"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownRendererEvent = void 0;
const events_1 = require("../events");
const path = __importStar(require("path"));
/**
 * An event emitted at the beginning and end of the rendering process.
 *
 * @event
 */
class MarkdownRendererEvent extends Event {
    /**
     * @ignore
     */
    constructor(name, outputDirectory, project) {
        super(name);
        this.outputDirectory = outputDirectory;
        this.project = project;
    }
    /**
     * @ignore
     */
    createPageEvent(mapping) {
        const event = new events_1.MarkdownPageEvent(events_1.MarkdownPageEvent.BEGIN, mapping.model);
        event.project = this.project;
        event.url = mapping.url;
        event.filename = path.join(this.outputDirectory, mapping.url);
        return [mapping.template, event];
    }
}
exports.MarkdownRendererEvent = MarkdownRendererEvent;
/**
 * Triggered before the renderer starts rendering a project.
 * @event
 */
MarkdownRendererEvent.BEGIN = 'beginRender';
/**
 * Triggered after the renderer has written all documents.
 * @event
 */
MarkdownRendererEvent.END = 'endRender';
