import G6 from '@antv/g6';

let graph;

/**
 *
 * @param {HTMLElement} containerDom
 * @returns {*}
 */
function init (containerDom) {
    if (graph) {
        return graph;
    }
    graph = new G6.Graph({
        container: containerDom,
        width: 500,
        height: 500,
        modes: {

            default: ['drag-canvas', {

                type: 'zoom-canvas',

                sensitivity: 5

            }],

            edit: ['click-select']

        }
    });
    return graph;
}

function draw (data) {
    if (!data) {
        throw new Error('data not fount');
    }
    graph.data(data);
    graph.render();
}

export default {
    init,
    draw,
}
