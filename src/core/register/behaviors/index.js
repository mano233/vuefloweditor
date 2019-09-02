import editorStyle from "@/config/defaultStyle";
import store from '../../../store'
// 暴露出去的回调函数
let behaviorsCallBack = {
    onClickAddNode: null, //添加节点
    onClickAddEdge: null, //添加线条
};

function registerBehavior(G6){
    // 添加元素
    G6.registerBehavior('click-add-node', {
        getEvents () {
            return {
                'canvas:click': 'onClick',
                'node:click' : 'nodeClick',
                //'keyup' : 'onKeyup'???监听键盘事件，
            };
        },
        //点击canvas
        onClick (ev) {
            // 利用回调函数操作，提高扩展性
            behaviorsCallBack.onClickAddNode.call(this, ev);

            //点击canvas禁止编辑
            store.commit('SET_SHOWVIEW',false)
        },
        //点击节点
        nodeClick(e){

            //传参
            // store.commit('SET_ITEMNODE',ev.item);
            //点击节点编辑内容
            // store.commit('SET_SHOWVIEW',true);
            //判断点击的形状
            // let shape = ev.item._cfg.keyShape._cfg.type;
        },

    });
    // 添加线条
    G6.registerBehavior('click-add-edge', {
        getEvents () {
            return {
                'node:click': 'onClick',
                mousemove: 'onMousemove',
                'edge:click': 'onEdgeClick' // 点击空白处，取消边
            };
        },
        onClick (ev) {
            // 利用回调函数操作，提高扩展性
            behaviorsCallBack.onClickAddEdge.call(this, ev);
        },
        onMousemove (ev) {
            const point = {x: ev.x, y: ev.y};
            if (this.addingEdge && this.edge) {
                this.graph.updateItem(this.edge, {
                    target: point
                });
            }
        },
        onEdgeClick (ev) {
            const currentEdge = ev.item;
            // 拖拽过程中，点击会点击到新增的边上
            if (this.addingEdge && this.edge == currentEdge) {
                this.graph.removeItem(this.edge);
                this.edge = null;
                this.addingEdge = false;
            }
        }
    });
    // 删除元素
    G6.registerBehavior('delete-add-node', {
        getEvents () {
            return {
                'node:click': 'nodeClick'
            };
        },
        nodeClick (ev) {
            this.graph.removeItem(ev.item);
        }
    });










    G6.registerBehavior('clickSelected', {
        getDefaultCfg() {
            return {
                multiple: false,
            }
        },
        getEvents() {
            return {
                'node:click': 'onClick',
                'edge:click': 'onClick',
                'edge:mouseover': 'onEdgeMouseOver',
                'edge:mouseleave': 'onEdgeMouseLeave',
                'canvas:click': 'onCanvasClick',
                'node:mouseover': 'onNodeMouseOver',
            }
        },
        onClick(e) {
            this._clearSelected();
            this.graph.setItemState(e.item, 'selected', true);
            let selectedItems = this.graph.get('selectedItems');
            //传参
            store.commit('SET_ITEMNODE',e.item);
            //点击节点编辑内容
            store.commit('SET_SHOWVIEW',true);
            if(!selectedItems)
                selectedItems = [];
            selectedItems = [e.item.get('id')];
            this.graph.set('selectedItems',selectedItems);
            this.graph.emit('afteritemselected',selectedItems);
        },
        onNodeMouseOver(e){
            if(this.graph.getCurrentMode() === 'edit')
                this.graph.setItemState(e.item, 'hover', true);
            else
                this.graph.setItemState(e.item, 'hover', false);
        },
        onEdgeMouseOver(e){
            if(this.graph.getCurrentMode() === 'edit' && !e.item.hasState('selected'))
                this.graph.setItemState(e.item, 'hover', true);
        },
        onEdgeMouseLeave(e){
            if(this.graph.getCurrentMode() === 'edit' && !e.item.hasState('selected'))
                this.graph.setItemState(e.item, 'hover', false);
        },
        onCanvasClick(){
            this._clearSelected();
        },
        _clearSelected(){
            let selected = this.graph.findAllByState('node', 'selected');
            selected.forEach(node => {
                this.graph.setItemState(node, 'selected', false);
            });
            selected = this.graph.findAllByState('edge', 'selected');
            selected.forEach(edge => {
                this.graph.setItemState(edge, 'selected', false);
            });
            this.graph.set('selectedItems',[]);
            this.graph.emit('afteritemselected',[]);
        }
    });
    G6.registerBehavior('hoverNodeActived', {
        getEvents() {
            return {
                'node:mouseenter': 'onNodeEnter',
                'node:mouseleave': 'onNodeLeave',
                'anchor:mouseleave': 'onAnchorLeave',
            }
        },
        onAnchorLeave(e){
            let node = e.item.getContainer().getParent();
            if(node && !this.graph.get('onDragEdge')) {
                this.graph.setItemState(node.get('item'), 'show-anchor', false);
            }
        },
        onNodeEnter(e){
            const clazz = e.item.getModel().clazz;
            if(clazz !== 'endEvent' && !this.graph.get('onDragEdge'))
                this.graph.setItemState(e.item, 'show-anchor', true);
        },
        onNodeLeave(e){
            if(e.target.type !== 'marker' && !this.graph.get('onDragEdge')) {
                this.graph.setItemState(e.item, 'show-anchor', false);
            }
        },
    });
    G6.registerBehavior('dragEdge', {
        getDefaultCfg() {
            return {
                updateEdge: true,
                delegate: true,
                delegateStyle: {},
                dragEdge: false,
            };
        },
        getEvents() {
            // debugger
            return {
                'anchor:dragstart': 'onDragStart',
                'anchor:drag': 'onDrag',
                'anchor:dragend': 'onDragEnd',
                'anchor:dragenter': 'onDragEnter',
                'anchor:dragleave': 'onDragLeave',
            };
        },
        onDragEnter(e){
            if (!this.origin) {
                return;
            }
            if(!this.sameNode(e)) {
                e.item.setHotspotActived(true);
                this.origin.targetNode = e.target.getParent().getParent().get('item');
                this.origin.targetAnchor = e.item.get('index');
            }
        },
        onDragLeave(e){
            if (!this.origin) {
                return;
            }
            if(!this.sameNode(e)) {
                e.item.setHotspotActived(false);
                this.origin.targetNode = null;
                this.origin.targetAnchor = null;
            }
        },
        onDragStart(e) {
            const node = e.target.getParent().getParent().get('item');
            const anchorIndex = e.item.get('index');
            const point = node.getAnchorPoints()[anchorIndex];
            this.target = e.item;
            this.origin = {
                x: point.x,
                y: point.y,
                sourceNode: node,
                sourceAnchor: anchorIndex
            };
            this.dragEdgeBeforeShowAnchor(e);
            this.graph.set('onDragEdge',true);
        },
        onDrag(e) {
            if (!this.origin) {
                return;
            }
            this._updateEdge(this.target, e);
        },
        onDragEnd(e) {
            if (!this.origin) {
                return;
            }
            const delegateShape = e.item.get('edgeDelegate');
            if (delegateShape) {
                delegateShape.remove();
                this.target.set('edgeDelegate', null);
            }
            this._updateEdge(this.target, e, true);
            this.graph.setItemState(this.origin.sourceNode, 'show-anchor', false);
            this.target = null;
            this.origin = null;
            this.graph.set('onDragEdge',false);
        },
        sameNode(e){
            return e.target.type === 'marker' && e.target.getParent() && e.target.getParent().getParent().get('item').get('id') === this.origin.sourceNode.get('id')
        },
        dragEdgeBeforeShowAnchor() {
            this.graph.getNodes().forEach(node => {
                if(node.getModel().clazz === 'startEvent'
                   || node.getModel().clazz === 'timerStartEvent'
                   || node.getModel().clazz === 'messageStartEvent')
                    return;
                const group = node.getContainer();
                group.showAnchor(group);
                group.anchorShapes.forEach(a => a.get('item').showHotpot())
            });
        },
        _updateEdge(item, e, force) {
            const x = e.x;
            const y = e.y;
            if (this.delegate && !force) {
                this._updateEdgeDelegate(item, x, y);
                return;
            }
            this._addEdge(e);
            this._clearAllAnchor();
            this.graph.paint();
        },
        _updateEdgeDelegate(item, x, y) {
            const self = this;
            let edgeShape = item.get('edgeDelegate');
            if (!edgeShape) {
                const parent = self.graph.get('group');
                edgeShape = parent.addShape('line', {
                    attrs: {
                        x1: this.origin.x,
                        y1: this.origin.y,
                        x2: x,
                        y2: y,
                        ...editorStyle.edgeDelegationStyle,
                    }
                });
                edgeShape.set('capture', false);
                item.set('edgeDelegate', edgeShape);
            }
            edgeShape.attr({ x2: x, y2: y });
            this.graph.paint();
        },
        _clearAllAnchor(){
            this.graph.getNodes().forEach(node => {
                const group = node.getContainer();
                group.clearAnchor(group);
            });
        },
        _addEdge(){
            if(this.origin.targetNode) {
                const addModel = {
                    clazz: 'flow',
                    source: this.origin.sourceNode.get('id'),
                    target: this.origin.targetNode.get('id'),
                    sourceAnchor: this.origin.sourceAnchor,
                    targetAnchor: this.origin.targetAnchor,
                }
                if(this.graph.executeCommand){
                    this.graph.executeCommand('add', {
                        type: 'edge',
                        addModel: addModel
                    });
                }else{
                    this.graph.add('edge', addModel);
                }
            }
        }
    });
}



export {behaviorsCallBack,registerBehavior}
