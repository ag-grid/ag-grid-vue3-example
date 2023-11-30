<template>
  <input ref="inputRef" v-model="value"/>
</template>

<script setup>
import {ref, nextTick, onMounted} from 'vue';

const props = defineProps({params: Object})

const inputRef = ref(null);

const value = ref();
const cancelBeforeStart = ref(true);
const highlightAllOnFocus = ref(true);

const getValue = () => {
  return `${value.value} (edited)`;
}

const isCancelBeforeStart = () => {
  return false;
}

const isCancelAfterEnd = () => {
  return false;
}

onMounted(() => {
  value.value = props.params.value;

  nextTick(() => {
    // need to check if the input reference is still valid - if the edit was cancelled before it started there
    // wont be an editor component anymore
    if (inputRef.value) {
      inputRef.value.focus();
    }
  });
});
</script>

