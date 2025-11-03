<template>
	<div>
		<ParsedMessage :text="text" :message="message" :network="network" />
	</div>
</template>

<script lang="ts">
import ParsedMessage from "../../../client/components/ParsedMessage.vue";
import {defineComponent, type PropType} from "vue";
import type {ClientMessage, ClientNetwork} from "../../../client/js/types.ts";

export default defineComponent({
	name: "ParsedMessageTestWrapper",
	components: {
		ParsedMessage,
	},
	props: {
		text: String,
		message: {type: Object as PropType<ClientMessage>},
		network: {type: Object as PropType<ClientNetwork>, required: true},
	},
});
</script>
