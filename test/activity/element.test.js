import { ElementAttrAction, ElementPropAction, ElementAppendAction, 
    ElementInsertBeforeAction, ElementRemoveAction, 
    ElementRemoveBeforeAction  } from "../../dist/action-component.js";
import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert'
import { JSDOM } from 'jsdom'

const window = new JSDOM(`<!DOCTYPE html><body></body>`).window;
const document = window.document;
const body = document.body;

globalThis.Element = window.Element
globalThis.document = window.document
globalThis.window = window;

describe('ElementAttrAction', async (t) => {
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

    await it('should correctly create an ElementAttrAction', (t) => {
        const element = body.querySelector('aside');
        const attrAction = new ElementAttrAction('class', element);
        assert.equal(attrAction.attrName, 'class');
        assert.equal(attrAction.element, element);
    });

    await it('should correctly update the element', (t) => {
        const element = body.querySelector('aside');
        const attrAction = new ElementAttrAction('class', element);
        assert.equal(element.getAttribute('class'), null);
        attrAction.act({ value: 'main' });
        assert.equal(element.getAttribute('class'), 'main');
    });

});

describe('ElementPropAction', async (t) => {
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

    await it('should correctly create an ElementPropAction', (t) => {
        const element = body.querySelector('aside');
        const propAction = new ElementPropAction('textContent', element);
        assert.equal(propAction.propName, 'textContent');
        assert.equal(propAction.element, element);
    });

    await it('should correctly update the element', (t) => {
        const element = body.querySelector('aside');
        const propAction = new ElementPropAction('textContent', element);
        assert.equal(element.textContent, '');
        propAction.act({ value: 'Nice work' });
        assert.equal(element.textContent, 'Nice work');
    });

});

describe('ElementAppendAction', async (t) => {
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

    await it('should correctly create an ElementAppendAction', (t) => {
        const element = body.querySelector('aside');
        const appendAction = new ElementAppendAction(element);
        assert.equal(appendAction.element, element);
    });

    await it('should correctly append to the element', (t) => {
        const element = body.querySelector('main');
        const appendAction = new ElementAppendAction(element);
        const child = document.createElement('div');
        assert.notEqual(element.lastElementChild, child);
        appendAction.act({ value: child });
        assert.equal(element.lastElementChild, child);
    });

});


describe('ElementInsertBeforeAction', async (t) => {
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

    await it('should correctly create an ElementInsertBeforeAction', (t) => {
        const before = body.querySelector('aside');
        const beforeAction = new ElementInsertBeforeAction(before);
        assert.equal(beforeAction.element, before);
    });

    await it('should correctly insert before the element', (t) => {
        const before = body.querySelector('aside');
        const beforeAction = new ElementInsertBeforeAction(before);
        const sib = document.createElement('div');
        assert.notEqual(before.previousElementSibling, sib);
        beforeAction.act({ value: sib });
        assert.equal(before.previousElementSibling, sib);
    });

});

describe('ElementRemoveAction', async (t) => {
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

    await it('should correctly create an ElementRemoveAction', (t) => {
        const element = body.querySelector('aside');
        const removeAction = new ElementRemoveAction(element);
        assert.equal(removeAction.element, element);
    });

    await it('should correctly remove the last element of its element', (t) => {
        const element = body.querySelector('main');
        const removeAction = new ElementRemoveAction(element);
        const child = element.lastElementChild;
        const prev = child.previousElementSibling;
        const length = element.children.length;
        assert.equal(element.lastElementChild, child);
        removeAction.act({ value: child });
        assert.notEqual(element.lastElementChild, child);
        assert.equal(element.lastElementChild, prev);
        assert.equal(element.children.length, length - 1);
    });

});

describe('ElementRemoveBeforeAction', async (t) => {
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

    await it('should correctly create an ElementRemoveBeforeAction', (t) => {
        const element = body.querySelector('aside');
        const removeAction = new ElementRemoveBeforeAction(element);
        assert.equal(removeAction.element, element);
    });

    await it('should correctly remove the element before its element', (t) => {
        const element = body.querySelector('aside');
        const removeAction = new ElementRemoveBeforeAction(element);
        const prev = element.previousElementSibling;
        const prevPrev = prev.previousElementSibling;
        const length = element.parentElement.children.length;
        assert.equal(element.previousElementSibling, prev);
        removeAction.act();
        assert.notEqual(element.previousElementSibling, prev);
        assert.equal(element.previousElementSibling, prevPrev);
        assert.equal(element.parentElement.children.length, length - 1);
    });

});