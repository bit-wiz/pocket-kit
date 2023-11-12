<script>
	import RLT from "$lib/RLT.svelte";

</script>
<RLT collection="playlists" id="r2cffq9dzuidf66" query={{ sort: '-created' }}  let:record>
    {#if record}
        {#if record.items}
            {#each record.items as item}
            <ul>
                <li>{item.name}</li>
            </ul>
            {/each}

        {:else}
            {JSON.stringify(record)}
        {/if}

    {/if}
</RLT>
