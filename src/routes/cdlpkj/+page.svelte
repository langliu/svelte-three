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

<button
  class="text-xl fixed right-4 bottom-4 w-16 h-16 bg-violet-400 flex justify-center items-center rounded-full text-white cursor-pointer"
  on:click={handleLayer}
>
  {isLayer ? '收起' : '展开'}
</button>
