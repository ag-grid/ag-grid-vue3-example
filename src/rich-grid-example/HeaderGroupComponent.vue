<template>
  <div>
    <div class="customHeaderLabel"> {{ params.displayName }}</div>
    <div :class="expandOrCollapseClass"
         @click="expandOrCollapse">
      <i class="fa fa-arrow-right"></i>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, onMounted} from 'vue';

const props = defineProps({params: Object})
const expanded = ref(false);

const expandOrCollapseClass = computed({
      get() {
        return {
          'customExpandButton expanded': expanded.value,
          'customExpandButton collapsed': !expanded.value
        }
      }
    }
);

const expandOrCollapse = () => {
  props.params.setExpanded(!expanded.value);
}

const onExpandChanged = () => {
  expanded.value = props.params.columnGroup.getProvidedColumnGroup().isExpanded()
}

onMounted(() => {
  props.params.columnGroup.getProvidedColumnGroup().addEventListener('expandedChanged', onExpandChanged);
})
</script>

<style>
.customHeaderLabel {
  margin-left: 5px;
  margin-top: 3px;
  float: left;
}

.customExpandButton {
  float: right;
  margin-top: 5px;
  margin-left: 3px;
}

.expanded {
  animation-name: toExpanded;
  animation-duration: 1s;
  -webkit-transform: rotate(180deg); /* Chrome, Safari, Opera */
  transform: rotate(180deg);
}

.collapsed {
  color: cornflowerblue;
  animation-name: toCollapsed;
  animation-duration: 1s;
  -webkit-transform: rotate(0deg); /* Chrome, Safari, Opera */
  transform: rotate(0deg);
}

@keyframes toExpanded {
  from {
    color: cornflowerblue;
    -webkit-transform: rotate(0deg); /* Chrome, Safari, Opera */
    transform: rotate(0deg);
  }
  to {
    color: black;
    -webkit-transform: rotate(180deg); /* Chrome, Safari, Opera */
    transform: rotate(180deg);
  }
}

@keyframes toCollapsed {
  from {
    color: black;
    -webkit-transform: rotate(180deg); /* Chrome, Safari, Opera */
    transform: rotate(180deg);
  }
  to {
    color: cornflowerblue;
    -webkit-transform: rotate(0deg); /* Chrome, Safari, Opera */
    transform: rotate(0deg);
  }
}
</style>
