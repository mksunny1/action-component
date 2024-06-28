import { ActionComponent } from "../../dist/action-component.js";
import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert'
import { JSDOM } from 'jsdom'
import { ActionObject } from "action-object";
import { ClassAction } from "class-action";

const window = new JSDOM(`<!DOCTYPE html><body></body>`).window;
const document = window.document;
const body = document.body;

describe('ActionComponent.constructor', async (t) => {
    const root = {
        sun: 0,
        planets: {
            mercury: 1,
            venus: 2,
            earth: 3,
            mars: 4,
            jupiter: 5
        },
        colors: {
            red: 'f00',
            green: '0f0',
            blie: '00f'
        }
    }
    await it('Should construct a valid ActionComponent', (t) => {
        const actionRoot = new ActionObject(root)
        const actionComponent = new ActionComponent([actionRoot]);
        assert.equal(actionComponent instanceof ActionComponent, true);
        assert.deepEqual(Object.keys(actionComponent), ['reactionKeys', 'roots', 'key']);
        assert.deepEqual(actionComponent.roots, [actionRoot]);
    });
    await it('Should create action obects if necessary', (t) => {
        const actionComponent = new ActionComponent([root]);
        assert.equal(actionComponent instanceof ActionComponent, true);
        assert.deepEqual(Object.keys(actionComponent), ['reactionKeys', 'roots', 'key']);
        assert.deepEqual(actionComponent.roots[0] instanceof ActionObject, true);
    });
});

describe('ActionComponent.process', async (t) => {
    const root = {
        sun: 0,
        planets: {
            mercury: 1,
            venus: 2,
            earth: 3,
            mars: 4,
            jupiter: 5
        },
        colors: {
            red: 'f00',
            green: '0f0',
            blie: '00f'
        }
    }

    await it('Should recursively process an element', (t) => {
        body.innerHTML = `
        <h1> </h1>
        <main>
            <h2></h2>
            <section></section>
            <section></section>
            <aside></aside>
            <section></section>
        </main>
        <footer></footer>
        `;

        class MyComponentReaction extends ClassAction {
            tags = [];
            act(context) {
                this.tags.push(context.element.tagName.toLowerCase());
            }
        }

        const actionComponent = new ActionComponent([root], new MyComponentReaction());
        actionComponent.process(body);
        assert.deepEqual(actionComponent.reactions[0].tags, [
            'body', 'h1', 'main', 'h2', 'section', 'section', 'aside', 
            'section', 'footer'
        ]);
    });


    await it('Should not recursively process a closed element', (t) => {
        body.innerHTML = `
        <h1> </h1>
        <main>
            <h2></h2>
            <section></section>
            <section></section>
            <aside></aside>
            <section></section>
        </main>
        <footer></footer>
        `;

        class MyComponentReaction extends ClassAction {
            tags = [];
            act(context) {
                const tag = context.element.tagName.toLowerCase();
                if (tag === 'main') { context.closedElement = true; }
                this.tags.push(tag);
            }
        }

        const actionComponent = new ActionComponent([root], new MyComponentReaction());
        actionComponent.process(body);
        assert.deepEqual(actionComponent.reactions[0].tags, [
            'body', 'h1', 'main', 'footer'
        ]);
    });


});


