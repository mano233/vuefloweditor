import G6 from '@antv/g6';
import './behaviors';

export class Graph{
    static instance = null;
    /**
     *
     * @param {Object} canvasOptions
     */
    static init (canvasOptions) {
        if (!this.instance) {
            this.instance = new G6.Graph(canvasOptions);
        }
        return this.instance;
    }

    /**
     *
     * @param data
     */
    static draw(data){
        if (!data) {
            throw new Error('data not fount');
        }
        this.instance.data(data);
        this.instance.render();
    }

    static clearCanvas(){
        this.instance.clear();
        this.instance.refresh();
    }
}



