import { CalcAction } from "../../dist/action-component.js";
import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert'

describe('CalcAction', async (t) => {
    await it('should correctly create a CalcAction with a given index', (t) => {
        const reaction = { val: '', act(context) { this.val = context.value } }
        const calcAction = new CalcAction(['a', 'b', 'c'], 0, reaction);
        calcAction.act();
        assert.equal(reaction.val, 'abc')
        calcAction.act({ value: 'xyz'});
        assert.equal(reaction.val, 'xyzbc')
        calcAction.act({ value: 'wow'});
        assert.equal(reaction.val, 'wowbc')
    });




});
