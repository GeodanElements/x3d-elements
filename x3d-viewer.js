import {LitElement, html} from '@polymer/lit-element';


import 'x3dom/x3dom.js';
import 'proj4/dist/proj4.js';
import 'd3/dist/d3.min.js';
import 'x3dmap.js';

class X3dViewer extends LitElement {
    static get properties() {
        return {
            tilesize: {
                value: 200
            },
            map: {
                type: Object,
                notify: true
            },
            layers: {
                type: Array
            },
            headlight: {
                type: String,
                value: 'false'
            },
            hour: {
                type: Boolean,
                value: 8,
                observer: '_hourChanged'
            }
        }
    }
    constructor() {
    }
    _render({foo, whales}) {
        return html`
            <style>
                #x3delement {
                    /*fixme*/
                width: 600px;
                height: 600px;
                }
                
                #debugconsole {
                    display: block;
                }
                
            </style>
            <div id='debugconsole'>
            </div>
            
            <x3d id="x3delement" width=100% height=100%>
                <Scene class='scene'>
                    <Environment 
                        frustumCulling=true 
                        lowPriorityCulling=true 
                        lowPriorityThreshold=0.5
                        shadowExcludeTransparentObjects=true
                    ></Environment>
                    <Fog 
                        visibilityRange='2000' 
                        fogType='LINEAR'
                        color='0.1843137254901961 0.3411764705882353 0.47058823529411764'
                    ></Fog>
                    <Background class="material" 
                        skyColor="0.1843137254901961 0.3411764705882353 0.47058823529411764"
                    ></Background>
                    <DirectionalLight 
                        direction="-0.2 -0.8 -0.4" 
                        intensity="0.7" 
                        shadowIntensity="0" 
                        color="1,1,1" 
                        on="true" 
                    ></DirectionalLight>
                    <NavigationInfo
                        id='navInfo'
                        headlight='true'
                        type='"examine" "any"'
                        typeParams='0.0 0.0 0.2 1.4'
                        transitionTime='4.0'
                        
                        ></NavigationInfo>
                    
                    <ViewPoint id='viewpoint'
                    centerOfRotation="0 0 0"
                    position="0 0 100"
                    zNear=30
                    zFar=1000
                    orientation="0 0 0 0"
                    ></ViewPoint>
                    <ViewPoint id='Northwards'
                        zNear=30 
                        centerOfRotation='0 0 0'
                        position='0 0 0'
                        orientation='1 0 0 1.5'
                        ></ViewPoint>
                    <ViewPoint id='Southwards'
                        zNear=30 
                        centerOfRotation='0 0 0'
                        position='0 0 0'
                        orientation='1 0 0 3'
                        ></ViewPoint>
                    <ViewPoint id='leiden1' 
                        zNear=30 
                        centerOfRotation='93610.0181 463873.2183 25.6168'
                        position='93610.0181 463873.2183 25.6168'
                        orientation='-0.3716 0.6002 0.7083 4.1466'
                        ></ViewPoint>
                    <ViewPoint id='leiden2' 
                        zNear=30 
                        centerOfRotation='93975.3693 463909.0736 56.0040'
                        position='93975.3693 463909.0736 56.0040'
                        orientation='0.4143 0.4794 0.7736 2.1176'
                        ></ViewPoint>
                    <ViewPoint id='leiden3' 
                        zNear=30 
                        centerOfRotation='93699.7792 463720.8471 30.8476'
                        position='93699.7792 463720.8471 30.8476'
                        orientation='0.9812 -0.1418 -0.1309 1.0953'
                        ></ViewPoint>
                    <transform translation='122690.10 483916.19 7'>
                    </transform>
                    <content></content>
                </Scene>
            </x3d>
        `;
    }

	_hourChanged(hour){
		d3.select('DirectionalLight')
			.transition().duration('2000')
			.attr('intensity', this.intensity(hour))
			.attr('direction',this.lightdirection(hour));
		d3.select('Background')
			.transition().duration('2000')
			.attr('skyColor', this.skycolor(hour));
	}

	lightdirection(time){
		var scale = d3.scaleLinear().domain([0,6,12,18,24])
			.range([
				'0.2 0.2 -1',
				'-1 0 -0.2', 
				'0.2 0.2 -1',
				'1 0 -0.2',
			'0.2 0.2 -1']);
		return scale(time);
	}

	skycolor(time){
		var scale = d3.scaleLinear().domain([0,12,24]).range(['black','steelblue','black']);
		var rgb = d3.rgb(scale(time));
		return rgb.r/255 + ' ' + rgb.g/255 + ' ' + rgb.b/255;
	}

	intensity(time){
		var scale= d3.scaleLinear().domain([0,12,24]).range([0.2,1,0.02]);
		return scale(time);
    }
    
	attached(){
		this.init();
	}
	

	init(){
		this.map = render(wxs3, this.$.x3delement, {
			themeconfig: this.themeconfig,
			tilesize: this.tilesize,
			loadlist: this.layers,
			bbox: '93616,463691,93887,463981' //Leiden
		});

	}

}
customElements.define('x3d-viewer', X3dViewer);

