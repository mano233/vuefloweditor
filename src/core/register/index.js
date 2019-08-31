import {registerBehavior} from './behaviors';
import {registerEdge} from './edge'
import {registerNode} from './node';

export function register(G6){
    registerEdge(G6);
    registerBehavior(G6);
    registerNode(G6);
}
