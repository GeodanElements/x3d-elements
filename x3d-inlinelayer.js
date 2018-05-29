import {LitElement, html} from '@polymer/lit-element';
 
class X3dInlinelayer extends LitElement {
    static get properties() {
        return {
			map: {
				type: Object
			},
			render: {
				type: Boolean,
				observer: '_renderChanged'
			},
			url: {
				type: String
			},
			name: {
				type: String
			},
			loading: {
				type: Boolean,
				value: false,
				notify: true
            }
        }
	}
	

	attached(){
		var self = this;
		this._layer = this.$.layer;
    	var inline = d3.select('#'+this.name);
        inline.attr('url',this.url)
			.attr('render',this.render);
			
    }
    _renderChanged(){
        var inline = d3.select('#'+this.name)
			.attr('render',this.render);
	}
	
}
customElements.define('x3d-inlinelayer', X3dInlinelayer);
