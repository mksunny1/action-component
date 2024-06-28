import { ActionComponent, ComponentLocalAction, ComponentTextContentAction, ElementRenderAction  } from "../../dist/action-component.js";
import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert'
import { JSDOM } from 'jsdom'
import { ActionObject } from "action-object";

const window = new JSDOM(`<!DOCTYPE html><body></body>`).window;
const document = window.document;
const body = document.body;

globalThis.Element = window.Element
globalThis.HTMLTemplateElement = window.HTMLTemplateElement
globalThis.document = window.document
globalThis.window = window;

describe('ComponentLocalAction', async (t) => {
    body.innerHTML = `
        <h1>Planets</h1>
        <main loc-al="#planets">
            <h2></h2>
            <section t>#mercury</section>
            <section t>#venus</section>
            <aside t>#sun</aside>
            <div t>#earth</div>
        </main>
        <footer></footer>
        `;

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

    class MyActionComponent extends ActionComponent {
        static reactions = [ new ComponentTextContentAction() ];
    }
    ComponentLocalAction.addTo(MyActionComponent, 0);

    await it('should correctly localize references', (t) => {
        const actionRoot = new ActionObject(root);
        const actionComponent = new MyActionComponent();
        
        // generate reactivity actions from attributes
        actionComponent.act({ element: body, root: actionRoot } );
        
        actionRoot.act();

        assert.equal(body.querySelector('section').textContent, '1');
        assert.equal(body.querySelector('div').textContent, '3');
        assert.equal(body.querySelector('aside').textContent, '0');

        actionRoot.set('sun', 20);
        assert.equal(body.querySelector('aside').textContent, '20');
    });

});

