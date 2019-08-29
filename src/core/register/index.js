import {registerBehavior} from './behaviors';
import {registerNode} from './node';

export function register(G6){
    registerBehavior(G6);
    registerNode(G6)
}
