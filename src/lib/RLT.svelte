<script lang="ts">
	import type { RecordListQueryParams } from 'pocketbase';
	import { pbStore } from './stores';
	import { onDestroy, onMount } from 'svelte';

	export let collection: string;
	export let id: string = "*";
	export let query: RecordListQueryParams | undefined = undefined;
	export let page: number | undefined = 1;
	export let perPage: number | undefined = 50;

	let record: any;

    async function getRec() {
        if(id !== "*") {

            return await $pbStore.collection(collection).getOne(id, query)
        }

        return await $pbStore.collection(collection).getList(page, perPage, query)
    }


    $pbStore.collection(collection).subscribe(id, async (_) => {
        record = await getRec()
    })

    onMount(async()=>{
        record = await getRec()
    })

    onDestroy(async()=>{
        $pbStore.collection(collection).unsubscribe(id)
    })
</script>

{#await record then data}
	{#if !data}
		<slot name="loading" />
	{/if}
	<slot record={data} />
{:catch error}
	<slot name="error" {error} />
{/await}
