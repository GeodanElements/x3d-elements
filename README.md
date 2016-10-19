# x3d-elements
Polymer elements that can build an x3d viewer

Works like:

```
<x3d-viewer 
 map={{map}} 
 headlight=[[headlight]]
 hour=[[hourselected]]
 themeconfig=[[themeconfig]]>
 <x3d-layer 
	active=true 
	map=[[map]]
	on-loading='_loading'
	on-loaded='_loaded'
	url='url.to.data' 
	name='mylayer'
	themeconfig={keys:values}
	></x3d-layer>
</x3d-viewer>
```