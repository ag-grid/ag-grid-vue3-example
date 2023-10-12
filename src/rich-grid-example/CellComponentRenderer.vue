<template>
  {{ value }}
</template>

<script lang="jsx" setup>
const props = defineProps({params: Object})
const {value} = props.params;
</script>
