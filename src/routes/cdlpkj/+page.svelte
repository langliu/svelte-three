<script lang="ts">
	import { onMount } from 'svelte';
	import { createScene, layer, removeLayer } from './render';
	let isLayer = false;

	function handleLayer() {
		if (isLayer) {
			removeLayer();
		} else {
			layer();
		}
		isLayer = !isLayer;
	}
	let el: HTMLCanvasElement;
	onMount(() => {
		createScene(el);
	});
</script>

<canvas bind:this={el} />

<div class="btn" on:click={handleLayer}>分层</div>

<style>
	.btn {
		width: 80px;
		height: 80px;
		background-color: blueviolet;
		position: fixed;
		right: 20px;
		bottom: 20px;
		border-radius: 50px;
		text-align: center;
		line-height: 80px;
		font-size: larger;
		color: white;
		font-weight: bold;
    cursor: pointer;
	}
</style>
