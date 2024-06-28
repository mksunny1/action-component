import { CalcAction, ComponentAction, processValue } from "../../dist/action-component.js";
import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert'
import { ActionObject } from "action-object";

describe('ComponentAction.act', async (t) => {
    const root = {
        sun: 0,
        planets: {
            mercury: 1,
            mercury2() { return 11;},
            venus: 2,
            earth: 3,
            mars: 4,
            jupiter: 5
        },
        colors: {
            red: 'f00',
            green: '0f0',
            green2() { return '00ff00'},
            blie: '00f'
        }
    }

    const actions = {};

    class MyComponentAction extends ComponentAction {
        createActions(context) {
            return {
                'planets.mercury': {
                    set: [
                        { act(context) { actions['mercury.set'] = context.value } }
                    ]
                },
                'planets.mercury2': {
                    call: [
                        { act(context) { actions['mercury2.call'] = context.value } }
                    ]
                },
                'colors.green': {
                    set: [
                        { act(context) { actions['green.set'] = context.value } }
                    ]
                },
                'colors.green2': {
                    call: [
                        { act(context) { actions['green2.call'] = context.value } }
                    ]
                }
            };
        }
    }

    await it('Should add created actions correctly', (t) => {
        const actionRoot = new ActionObject(root)
        const componentAction = new MyComponentAction();
        const context = { roots: [actionRoot] }

        // add the actions
        componentAction.act(context);   

        // call for mercury
        assert.equal(actions['mercury2.call'], undefined);
        actionRoot.getChild('planets').call('mercury2')
        assert.equal(actions['mercury2.call'], 11);
        assert.equal(actions['earth.call'], undefined);

        // call for green
        assert.equal(actions['green2.call'], undefined);
        actionRoot.getChild('colors').call('green2')
        assert.equal(actions['green2.call'], '00ff00');
        assert.equal(actions['blue2.call'], undefined);

        assert.equal(actions['mercury.set'], undefined);
        assert.equal(actions['green.set'], undefined);
        
        // trigger all the set actions with correct values
        actionRoot.act();      
        
        assert.equal(actions['mercury.set'], 1);
        assert.equal(actions['venus.set'], undefined);
        assert.equal(actions['green.set'], '0f0');
        assert.equal(actions['red.set'], undefined);

    });


    await it('Should add created actions correctly for empty string (self) path', (t) => {
        let value;
        class MyComponentAction2 extends ComponentAction {
            createActions(context) {
                return {
                    '': {
                        set: [
                            { act(context) { value = context.value } }
                        ]
                    }
                };
            }
        }
        
        const actionRoot = new ActionObject(25)
        const componentAction = new MyComponentAction2();
        const context = { roots: [actionRoot] }

        componentAction.act(context);   
        assert.equal(value, undefined);
        actionRoot.set('', 99)
        assert.equal(value, 99);
    });
    
});

describe('processValue', async (t) => {
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
            blie: '00f',
            brown: () => 'ff5500'
        }
    }

    await it('Should correctly interpret a "set" directive', (t) => {
        const result = {};
        const actionRoot = new ActionObject(root)
        processValue('#planets.venus', [actionRoot], result, [], {
            setPrefix: '#'
        });
        assert.deepEqual(result, { 'planets.venus': { set: [] } });
        
    });


    await it('Should correctly interpret a "call" directive', (t) => {
        const result = {};
        const actionRoot = new ActionObject(root)
        processValue('%planets.jupiter', [actionRoot], result, [], {
            callPrefix: '%'
        });
        assert.deepEqual(result, { 'planets.jupiter': { call: [] } });
        
    });

    await it('Should treat invalid directives as literals', (t) => {
        const result = {};
        const actionRoot = new ActionObject(root);
        processValue('#planets.venus', [actionRoot], result, [], {
            setPrefix: '$'
        });
        assert.deepEqual(result, { });
        
    });

    await it('Should create CalcActions for multi-value directives', (t) => {
        const result = {};
        const actionRoot = new ActionObject(root)
        let value;
        const reactions = [{ act(context) { value = context.value; } }];
        processValue('#planets.venus + $colors.brown + nice', [actionRoot], result, reactions, {
            setPrefix: '#', callPrefix: '$', valueSep: '+'
        });
        assert.equal(result['planets.venus'].set[0] instanceof CalcAction, true);
        assert.equal(result['colors.brown'].call[0] instanceof CalcAction, true);
        assert.deepEqual(result['planets.venus'].set[0].args, result['colors.brown'].call[0].args);
        assert.deepEqual(result['planets.venus'].set[0].reactions, reactions);
        assert.deepEqual(reactions, result['colors.brown'].call[0].reactions);
        assert.equal(result['planets.venus'].set[0].index, 0);
        assert.equal(result['colors.brown'].call[0].index, 1);

        result['planets.venus'].set[0].act();
        assert.equal(value, '2ff5500 nice');
    });

    await it('Should correctly interpret calc directives', (t) => {
        const result = {};
        const actionRoot = new ActionObject(root);
        let value;
        const reactions = [{ act(context) { value = context.value; } }];

        class NewCalcAction extends CalcAction {
            static calc = (...args) => args.join(' && ');
        }

        processValue('and:= #planets.venus + $colors.brown +nice', [actionRoot], result, reactions, {
            setPrefix: '#', callPrefix: '$', valueSep: '+', calcSep: ':=', calcs: { and: NewCalcAction }
        });

        result['planets.venus'].set[0].act();
        assert.equal(value, '2 && ff5500 && nice');
    });

});
