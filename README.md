# x3d-elements
Polymer elements that can build an x3d viewer

Works like:

```
<x3d-viewer 
 map=[mapobject]
 headlight=[true/false]
 hour=[0-24]
 themeconfig=[jsonconfig]>
 <x3d-layer 
	active=true 
	map=[mapobject]
	on-loading='_loading'
	on-loaded='_loaded'
	url='url.to.data' 
	name='mylayer'
	themeconfig=[jsonconfig]
	></x3d-layer>
</x3d-viewer>
```