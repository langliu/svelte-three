<script lang="ts">
  import { onMount } from 'svelte';
  import { createScene, layer, removeLayer, showFloor, meshShow } from './render';
  let isLayer = false;

  function handleLayer() {
    meshShow(true);
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

<div class="fixed right-24 bottom-4">
  <button
    class="text-xl w-16 h-16 bg-violet-400 inline-flex justify-center items-center rounded-full text-white cursor-pointer mr-4"
    on:click={() => showFloor(-1)}
  >
    负一楼
  </button>
  <button
    class="text-xl w-16 h-16 bg-violet-400 inline-flex justify-center items-center rounded-full text-white cursor-pointer mr-4"
    on:click={() => showFloor(1)}
  >
    一楼
  </button>
  <button
    class="text-xl w-16 h-16 bg-violet-400 inline-flex justify-center items-center rounded-full text-white cursor-pointer mr-4"
    on:click={() => showFloor(2)}
  >
    二楼
  </button>
  <button
    class="text-xl w-16 h-16 bg-violet-400 inline-flex justify-center items-center rounded-full text-white cursor-pointer mr-4"
    on:click={() => showFloor(4)}
  >
    四楼
  </button>
  <button
    class="text-xl w-16 h-16 bg-violet-400 inline-flex justify-center items-center rounded-full text-white cursor-pointer mr-4"
    on:click={() => showFloor(5)}
  >
    五楼
  </button>
</div>
